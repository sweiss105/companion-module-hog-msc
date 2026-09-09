import assert from 'node:assert/strict'
import { it } from 'node:test'
import { UpdateActions } from '../src/actions.js'
import type ModuleInstance from '../src/main.js'
import type { QueueItem } from '../src/queue.js'
import { formatBytes } from '../src/msc.js'

void it('blocks blank list controls before enqueue and preserves explicit command bytes', async () => {
	let definitions: Record<string, { callback(event: { options: { list?: string } }): Promise<void> }> = {}
	const items: QueueItem[] = []
	const errors: string[] = []
	UpdateActions({
		config: { deviceMode: 'specific', deviceId: 1 },
		setActionDefinitions: (value: typeof definitions) => {
			definitions = value
		},
		enqueue: (item: QueueItem) => items.push(item),
		log: (_level: string, message: string) => errors.push(message),
	} as unknown as ModuleInstance)
	for (const [id, command] of [
		['stop', '02'],
		['resume', '03'],
		['release', '0B'],
	]) {
		for (const list of [undefined, '', '   ']) {
			await definitions[id].callback({ options: { list } })
			assert.equal(items.length, 0)
			assert.match(errors.at(-1)!, /requires a List/)
		}
		await definitions[id].callback({ options: { list: '49' } })
		assert.equal(items.length, 1)
		assert.equal(formatBytes(items[0].bytes), `F0 7F 01 02 01 ${command} 00 34 39 F7`)
		items.length = 0
	}
})
