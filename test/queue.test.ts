import assert from 'node:assert/strict'
import { it } from 'node:test'
import { CommandQueue } from '../src/queue.js'

void it('transmits queued commands in FIFO order and calls completion after transmit', async () => {
	const events: string[] = []
	const queue = new CommandQueue(
		() => 0,
		async (item) => {
			events.push(`send:${item.description}`)
		},
		() => undefined,
	)
	queue.enqueue({ bytes: new Uint8Array(), description: 'one', onTransmitted: () => events.push('done:one') })
	queue.enqueue({ bytes: new Uint8Array(), description: 'two', onTransmitted: () => events.push('done:two') })
	await new Promise((resolve) => setTimeout(resolve, 10))
	assert.deepEqual(events, ['send:one', 'done:one', 'send:two', 'done:two'])
})
