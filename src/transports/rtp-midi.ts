import dgram from 'node:dgram'
import { randomBytes } from 'node:crypto'
import type { MidiTransport, TransportEvents } from './types.js'

const SIGNATURE = Buffer.from([0xff, 0xff])
const INVITATION = Buffer.from('IN')
const END = Buffer.from('BY')

function controlPacket(command: Buffer, token: number, ssrc: number, name: string): Buffer {
	const header = Buffer.alloc(12)
	SIGNATURE.copy(header, 0)
	command.copy(header, 2)
	header.writeUInt32BE(2, 4)
	header.writeUInt32BE(token, 8)
	const tail = Buffer.alloc(4)
	tail.writeUInt32BE(ssrc)
	return Buffer.concat([header, tail, Buffer.from(name), Buffer.from([0])])
}

export class RtpMidiTransport implements MidiTransport {
	private control?: dgram.Socket
	private data?: dgram.Socket
	private retry?: NodeJS.Timeout
	private stopped = false
	private ready = false
	private sequence = 0
	private readonly token = randomBytes(4).readUInt32BE()
	private readonly ssrc = randomBytes(4).readUInt32BE()

	constructor(
		private host: string,
		private port: number,
		private sessionName: string,
		private events: TransportEvents,
	) {}

	async connect(): Promise<void> {
		this.stopped = false
		await this.open()
	}

	private async open(): Promise<void> {
		if (this.stopped) return
		await this.closeSockets()
		this.ready = false
		this.events.onState('Reconnecting', `Inviting ${this.host}:${this.port}`)
		this.control = dgram.createSocket('udp4')
		this.data = dgram.createSocket('udp4')
		const onMessage = (message: Buffer) => {
			if (message.subarray(0, 2).equals(SIGNATURE) && message.subarray(2, 4).toString() === 'OK') {
				this.ready = true
				if (this.retry) clearTimeout(this.retry)
				this.retry = undefined
				this.events.onState('Connected')
			}
		}
		this.control.on('message', onMessage)
		this.data.on('message', onMessage)
		const onError = (error: Error) => this.events.onDebug(`RTP-MIDI error: ${error.message}`)
		this.control.on('error', onError)
		this.data.on('error', onError)
		await Promise.all([
			new Promise<void>((resolve) => this.control!.bind(0, resolve)),
			new Promise<void>((resolve) => this.data!.bind(0, resolve)),
		])
		const invitation = controlPacket(INVITATION, this.token, this.ssrc, this.sessionName)
		this.control.send(invitation, this.port, this.host)
		this.data.send(invitation, this.port + 1, this.host)
		this.retry = setTimeout(() => void this.open(), 2000)
	}

	private async closeSockets(): Promise<void> {
		for (const socket of [this.control, this.data]) {
			if (socket) await new Promise<void>((resolve) => socket.close(() => resolve()))
		}
		this.control = undefined
		this.data = undefined
	}

	async disconnect(): Promise<void> {
		this.stopped = true
		if (this.retry) clearTimeout(this.retry)
		this.retry = undefined
		if (this.control)
			this.control.send(controlPacket(END, this.token, this.ssrc, this.sessionName), this.port, this.host)
		await this.closeSockets()
		this.ready = false
		this.events.onState('Disconnected')
	}

	async send(bytes: Uint8Array): Promise<void> {
		if (!this.ready || !this.data) throw new Error('RTP-MIDI session is not connected')
		if (bytes.length > 0x0fff) throw new Error('RTP-MIDI message exceeds the 4095-byte command-section limit')
		const headerLength = bytes.length > 0x0f ? 2 : 1
		const packet = Buffer.alloc(12 + headerLength + bytes.length)
		packet[0] = 0x80
		packet[1] = 0x61
		packet.writeUInt16BE(this.sequence++ & 0xffff, 2)
		packet.writeUInt32BE(Math.floor(performance.now() * 10), 4)
		packet.writeUInt32BE(this.ssrc, 8)
		if (headerLength === 1) packet[12] = bytes.length
		else {
			packet[12] = 0x80 | ((bytes.length >> 8) & 0x0f)
			packet[13] = bytes.length & 0xff
		}
		Buffer.from(bytes).copy(packet, 12 + headerLength)
		await new Promise<void>((resolve, reject) =>
			this.data!.send(packet, this.port + 1, this.host, (error) => (error ? reject(error) : resolve())),
		)
	}
}
