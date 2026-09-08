import { createRequire } from 'node:module'
import type { MidiTransport, TransportEvents } from './types.js'

type MidiOutput = {
	getPortCount(): number
	getPortName(index: number): string
	openPort(index: number): void
	closePort(): void
	sendMessage(message: number[]): void
}

type MidiModule = { Output: new () => MidiOutput }

function createOutput(): MidiOutput {
	// Load the native binding only when USB MIDI is enumerated or selected. This keeps
	// the module loadable on hosts used solely for TCP/RTP-MIDI and in package checks.
	const require = createRequire(import.meta.url)
	const midi = require('@julusian/midi') as MidiModule
	return new midi.Output()
}

export function listMidiOutputs(): string[] {
	const output = createOutput()
	try {
		return Array.from({ length: output.getPortCount() }, (_, index) => output.getPortName(index))
	} finally {
		output.closePort()
	}
}

export class UsbMidiTransport implements MidiTransport {
	private output?: MidiOutput
	private retry?: NodeJS.Timeout
	private stopped = false

	constructor(
		private deviceName: string,
		private events: TransportEvents,
	) {}

	async connect(): Promise<void> {
		this.stopped = false
		this.open()
	}

	private open(): void {
		if (this.stopped || this.output) return
		try {
			const output = createOutput()
			const index = Array.from({ length: output.getPortCount() }, (_, i) => i).find(
				(i) => output.getPortName(i) === this.deviceName,
			)
			if (index === undefined) {
				output.closePort()
				throw new Error(`MIDI output “${this.deviceName}” is unavailable`)
			}
			output.openPort(index)
			this.output = output
			this.events.onState('Connected')
		} catch (error) {
			this.events.onDebug(error instanceof Error ? error.message : String(error))
			this.events.onState('Reconnecting')
			this.retry = setTimeout(() => this.open(), 2000)
		}
	}

	async disconnect(): Promise<void> {
		this.stopped = true
		if (this.retry) clearTimeout(this.retry)
		this.retry = undefined
		this.output?.closePort()
		this.output = undefined
		this.events.onState('Disconnected')
	}

	async send(bytes: Uint8Array): Promise<void> {
		if (!this.output) throw new Error('USB MIDI output is not connected')
		try {
			this.output.sendMessage([...bytes])
		} catch (error) {
			this.output.closePort()
			this.output = undefined
			this.events.onState('Reconnecting')
			this.retry = setTimeout(() => this.open(), 2000)
			throw error
		}
	}
}
