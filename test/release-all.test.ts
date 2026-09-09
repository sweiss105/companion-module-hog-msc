import assert from 'node:assert/strict'
import { it } from 'node:test'
import ModuleInstance from '../src/main.js'
import { SceneObservations } from '../src/return-msc.js'
import { CommandQueue, type QueueItem } from '../src/queue.js'
import { formatBytes } from '../src/msc.js'

function fixture() {
	const state = Object.create(ModuleInstance.prototype) as ModuleInstance
	Object.assign(state, {
		activeLists: new Set(['43', '44']),
		activeScenes: new Set(['43', '36']),
		observations: new SceneObservations(),
		listObservations: new SceneObservations(),
		transportState: 'Connected',
		checkFeedbacks: () => {},
		log: () => {},
		setVariableValues: () => {},
		updateStatus: () => {},
	})
	return state
}

void it('releases only the selected tracked category with explicit wire targets', () => {
	for (const scope of ['lists', 'scenes', 'all'] as const) {
		const state = fixture()
		const items: QueueItem[] = []
		state.enqueue = (item) => items.push(item)
		state.releaseTracked(scope, 1)
		const expected = [
			...(scope === 'scenes' ? [] : ['F0 7F 01 02 01 0B 00 34 33 F7', 'F0 7F 01 02 01 0B 00 34 34 F7']),
			...(scope === 'lists' ? [] : ['F0 7F 01 02 01 0B 00 34 33 00 05 F7', 'F0 7F 01 02 01 0B 00 33 36 00 05 F7']),
		]
		assert.deepEqual(
			items.map((item) => formatBytes(item.bytes)),
			expected,
		)
		assert.equal(state.isListActive('43'), true)
		assert.equal(state.isSceneActive('43'), true)
		for (const item of items) item.onTransmitted?.()
		assert.equal(state.isListActive('43'), scope === 'scenes')
		assert.equal(state.isSceneActive('43'), scope === 'lists')
	}
})

void it('snapshots before enqueue, excludes later activation, and handles empty/disconnected tracking', () => {
	const state = fixture()
	const items: QueueItem[] = []
	state.enqueue = (item) => {
		items.push(item)
		state.setSceneActive('99', true)
		state.setSceneActive('36', false)
	}
	state.releaseTracked('all', 'broadcast')
	assert.equal(items.length, 4)
	assert.equal(
		items.some((item) => item.description.includes('99')),
		false,
	)
	assert.equal(items[3].description, 'MSC Release Scene 36')
	assert.ok(items.every((item) => item.bytes[2] === 127))
	Object.assign(state, { transportState: 'Reconnecting' })
	assert.throws(() => state.releaseTracked('all', 1), /not connected/)
	assert.equal(items.length, 4)
	state.resetSceneStates()
	state.resetListStates()
	state.releaseTracked('all', 1)
	assert.equal(items.length, 4)
})

void it('uses send-time reconciliation and discards waiting releases on transport failure', async () => {
	const state = fixture()
	const internal = state as unknown as {
		transmit(item: QueueItem): Promise<void>
		setTransportState(state: 'Reconnecting'): void
		listObservations: SceneObservations
	}
	const sent: QueueItem[] = []
	const errors: string[] = []
	const queue = new CommandQueue(
		() => 0,
		async (item) => {
			sent.push(item)
			await internal.transmit(item)
		},
		(error) => errors.push(error.message),
	)
	let count = 0
	Object.assign(state, {
		commandQueue: queue,
		transport: {
			send: async () => {
				if (++count === 1) {
					// Hog reports the list active during release transmission: preserve that return.
					internal.listObservations.observe('43', true)
					state.setListActive('43', true)
				} else {
					internal.setTransportState('Reconnecting')
					throw new Error('USB removed')
				}
			},
		},
	})
	state.releaseTracked('all', 1)
	await new Promise((resolve) => setTimeout(resolve, 10))
	assert.equal(sent.length, 2)
	assert.deepEqual(errors, ['USB removed'])
	assert.equal(queue.length, 0)
	assert.equal(state.isListActive('43'), true)
	assert.equal(state.isListActive('44'), true)
	assert.equal(state.isSceneActive('36'), true)
})
