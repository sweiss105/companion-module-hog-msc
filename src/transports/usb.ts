import { Output } from '@julusian/midi/lazy'
import type { MidiTransport, TransportEvents } from './types.js'

type MidiOutput = {
	getPortCount(): number
	getPortName(index: number): string
	openPort(index: number): void
	closePort(): void
	sendMessage(message: number[]): void
}

function createOutput(): MidiOutput {
	// Use the package's lazy entry so its JavaScript native-loader is included in the
	// Companion bundle, while native loading remains deferred until USB is inspected.
	return new Output()
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
	private timer?: ReturnType<typeof setInterval>
	private stopped = true
	private state?: 'Connected' | 'Disconnected' | 'Reconnecting'

	constructor(
		private deviceName: string,
		private events: TransportEvents,
		private create: () => MidiOutput = createOutput,
	) {}

	async connect(): Promise<void> {
		if (!this.stopped) return
		this.stopped = false
		this.poll()
		this.timer = setInterval(() => this.poll(), 2000)
	}

	private setState(state: 'Connected' | 'Disconnected' | 'Reconnecting'): void {
		if (state === this.state) return
		this.state = state
		this.events.onState(state)
	}

	private close(): void {
		const output = this.output
		this.output = undefined
		try {
			output?.closePort()
		} catch (error) {
			this.events.onDebug(error instanceof Error ? error.message : String(error))
		}
	}

	private poll(): void {
		if (this.stopped) return
		let candidate: MidiOutput | undefined
		try {
			// A fresh enumerator avoids relying on a stale open native handle.
			candidate = this.create()
			const index = Array.from({ length: candidate.getPortCount() }, (_, i) => i).find(
				(i) => candidate!.getPortName(i) === this.deviceName,
			)
			if (index === undefined) throw new Error(`MIDI output “${this.deviceName}” is unavailable`)
			if (!this.output) {
				candidate.openPort(index)
				this.output = candidate
				candidate = undefined
				this.setState('Connected')
			}
		} catch (error) {
			this.close()
			if (this.state !== 'Reconnecting') this.events.onDebug(error instanceof Error ? error.message : String(error))
			this.setState('Reconnecting')
		} finally {
			try {
				candidate?.closePort()
			} catch (error) {
				this.events.onDebug(error instanceof Error ? error.message : String(error))
			}
		}
	}

	async disconnect(): Promise<void> {
		this.stopped = true
		if (this.timer) clearInterval(this.timer)
		this.timer = undefined
		this.close()
		this.setState('Disconnected')
	}

	async send(bytes: Uint8Array): Promise<void> {
		if (!this.output) throw new Error('USB MIDI output is not connected')
		try {
			this.output.sendMessage([...bytes])
		} catch (error) {
			this.close()
			this.setState('Reconnecting')
			throw error
		}
	}
}
