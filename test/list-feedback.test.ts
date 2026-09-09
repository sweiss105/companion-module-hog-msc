import assert from 'node:assert/strict'
import { it } from 'node:test'
import ModuleInstance from '../src/main.js'
import { parseListReturn, SceneObservations } from '../src/return-msc.js'
import { encodeGo, encodeListCommand, encodeScene, encodeTimedGo } from '../src/msc.js'

void it('recognizes explicit list events without confusing scenes or ambiguous targets', () => {
	const parse = (b: Uint8Array) => parseListReturn([...b], 1)
	assert.deepEqual(parse(encodeGo(1, '048', '1.2')), { list: '48', active: true })
	assert.deepEqual(parse(encodeListCommand(1, 3, '48')), { list: '48', active: true })
	assert.deepEqual(parse(encodeListCommand(1, 11, '48')), { list: '48', active: false })
	assert.deepEqual(parse(encodeTimedGo(1, '48', '2')), { list: '48', active: true })
	for (const b of [
		encodeScene(1, '48'),
		encodeListCommand(1, 2, '48'),
		encodeListCommand(1, 11),
		encodeGo(2, '48', '1'),
		encodeGo(1, '48'),
		encodeGo(1, 'bad', '1'),
	])
		assert.equal(parse(b), undefined)
	const good = [...encodeGo(1, '48', '1')]
	for (let i = 0; i < good.length; i++) assert.equal(parseListReturn(good.slice(0, i), 1), undefined)
	assert.equal(parseListReturn([...good.slice(0, -1), 0, 5, 247], 1), undefined)
})
void it('reconciles list state with return precedence, isolation, and reset', () => {
	const observations = new SceneObservations()
	const state = Object.create(ModuleInstance.prototype) as ModuleInstance
	Object.assign(state, {
		activeLists: new Set<string>(),
		listObservations: observations,
		activeScenes: new Set<string>(),
		checkFeedbacks: () => {},
	})
	state.setListActive('48', true)
	observations.observe('48', false)
	state.setListActive('48', false)
	state.setListActive('48', true)
	assert.equal(state.isListActive('048'), false)
	observations.invalidate('48')
	state.setListActive('48', true)
	assert.equal(state.isListActive('48'), true)
	assert.equal(state.isListActive('47'), false)
	assert.equal(state.isSceneActive('48'), false)
	observations.clear()
	assert.equal(state.isListActive('48'), true)
	state.resetListStates()
	assert.equal(state.isListActive('48'), false)
})

void it('accepts captured Hog List 47 GO and Release with an empty cue path', () => {
	const parse = (hex: string) =>
		parseListReturn(
			hex.split(' ').map((b) => parseInt(b, 16)),
			1,
		)
	assert.deepEqual(parse('F0 7F 01 02 01 01 31 00 34 37 00 F7'), { list: '47', active: true })
	assert.deepEqual(parse('F0 7F 01 02 01 0B 00 34 37 00 F7'), { list: '47', active: false })
	assert.equal(parse('F0 7F 01 02 01 0B 00 34 37 00 05 F7'), undefined)
	assert.equal(parse('F0 7F 01 02 01 0B 00 34 37 00 00 F7'), undefined)
})
