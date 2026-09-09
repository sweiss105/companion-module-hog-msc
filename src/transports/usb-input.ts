import { Input } from '@julusian/midi/lazy'

export function listMidiInputs(): string[] {
	const input = new Input()
	try {
		return Array.from({ length: input.getPortCount() }, (_, i) => input.getPortName(i))
	} finally {
		input.closePort()
	}
}

/** Receive only: this class never creates a MIDI Output or forwards messages. */
export class UsbReturnInput {
	private input?: Input
	private timer?: ReturnType<typeof setInterval>
	constructor(
		private readonly name: string,
		private readonly receive: (bytes: number[]) => void,
		private readonly state: (connected: boolean) => void,
	) {}
	start(): void {
		this.stop()
		const poll = () => {
			try {
				if (!listMidiInputs().includes(this.name)) throw new Error('Input unavailable')
				if (this.input) return
				const input = new Input()
				this.input = input
				input.on('message', (_delta, bytes) => this.receive(bytes))
				input.ignoreTypes(false, true, true)
				const index = Array.from({ length: input.getPortCount() }, (_, i) => i).find(
					(i) => input.getPortName(i) === this.name,
				)
				if (index === undefined) throw new Error('Input unavailable')
				input.openPort(index)
				this.state(true)
			} catch {
				this.close()
			}
		}
		poll()
		this.timer = setInterval(poll, 2000)
	}
	private close(): void {
		const input = this.input
		this.input = undefined
		if (input) {
			input.removeAllListeners()
			input.closePort()
		}
		this.state(false)
	}
	stop(): void {
		if (this.timer) clearInterval(this.timer)
		this.timer = undefined
		this.close()
	}
}
