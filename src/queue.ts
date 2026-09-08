export type QueueItem = {
	bytes: Uint8Array
	description: string
	onTransmitted?: () => void
}

export class CommandQueue {
	private items: QueueItem[] = []
	private running = false

	constructor(
		private delayMs: () => number,
		private transmit: (item: QueueItem) => Promise<void>,
		private onError: (error: Error, item: QueueItem) => void,
	) {}

	enqueue(item: QueueItem): void {
		this.items.push(item)
		void this.drain()
	}

	clear(): number {
		const count = this.items.length
		this.items = []
		return count
	}

	get length(): number {
		return this.items.length
	}

	private async drain(): Promise<void> {
		if (this.running) return
		this.running = true
		while (this.items.length > 0) {
			const item = this.items.shift()!
			try {
				await this.transmit(item)
				item.onTransmitted?.()
			} catch (error) {
				this.onError(error instanceof Error ? error : new Error(String(error)), item)
			}
			if (this.items.length > 0 && this.delayMs() > 0) {
				await new Promise<void>((resolve) => setTimeout(resolve, this.delayMs()))
			}
		}
		this.running = false
	}
}
