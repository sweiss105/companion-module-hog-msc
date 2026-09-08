import net from 'node:net'
import type { MidiTransport, TransportEvents } from './types.js'

export class TcpMidiTransport implements MidiTransport {
	private socket?: net.Socket
	private retry?: NodeJS.Timeout
	private stopped = false

	constructor(
		private host: string,
		private port: number,
		private events: TransportEvents,
	) {}

	async connect(): Promise<void> {
		this.stopped = false
		this.open()
	}

	private open(): void {
		if (this.stopped || this.socket) return
		this.events.onState('Reconnecting', `Connecting to ${this.host}:${this.port}`)
		const socket = net.createConnection({ host: this.host, port: this.port })
		this.socket = socket
		socket.setNoDelay(true)
		socket.once('connect', () => this.events.onState('Connected'))
		socket.on('error', (error) => this.events.onDebug(`TCP error: ${error.message}`))
		socket.once('close', () => {
			if (this.socket === socket) this.socket = undefined
			if (!this.stopped) {
				this.events.onState('Reconnecting')
				this.retry = setTimeout(() => this.open(), 2000)
			} else this.events.onState('Disconnected')
		})
	}

	async disconnect(): Promise<void> {
		this.stopped = true
		if (this.retry) clearTimeout(this.retry)
		this.retry = undefined
		this.socket?.destroy()
		this.socket = undefined
		this.events.onState('Disconnected')
	}

	async send(bytes: Uint8Array): Promise<void> {
		const socket = this.socket
		if (!socket || !socket.writable || socket.connecting) throw new Error('Raw MIDI TCP transport is not connected')
		await new Promise<void>((resolve, reject) => socket.write(bytes, (error) => (error ? reject(error) : resolve())))
	}
}
