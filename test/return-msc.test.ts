import assert from 'node:assert/strict'
import { it } from 'node:test'
import { parseSceneReturn, SceneObservations } from '../src/return-msc.js'
const go = [0xf0, 0x7f, 1, 2, 1, 1, 0, 0x33, 0x36, 0, 5, 0xf7]
void it('accepts native captures and rejects other devices, paths, commands and malformed data', () => {
	assert.deepEqual(parseSceneReturn(go, 1), { scene: '36', active: true })
	const release = [...go]
	release[5] = 11
	assert.deepEqual(parseSceneReturn(release, 1), { scene: '36', active: false })
	assert.equal(parseSceneReturn(go, 2), undefined)
	for (const [index, value] of [
		[4, 2],
		[5, 2],
		[6, 1],
		[7, 0x41],
		[10, 0x35],
		[11, 0],
	]) {
		const bad = [...go]
		bad[index] = value
		assert.equal(parseSceneReturn(bad, 1), undefined)
	}
	for (let n = 0; n < go.length; n++) assert.equal(parseSceneReturn(go.slice(0, n), 1), undefined)
})
void it('separates scenes and makes observations unknown after sends or input loss', () => {
	const state = new SceneObservations()
	assert.equal(state.get('36'), undefined)
	state.observe('036', true)
	state.observe('31', false)
	assert.equal(state.get('36'), true)
	state.invalidate('36')
	assert.equal(state.get('36'), undefined)
	assert.equal(state.get('31'), false)
	state.clear()
	assert.equal(state.get('31'), undefined)
})
