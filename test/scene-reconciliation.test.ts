import assert from 'node:assert/strict'
import { it } from 'node:test'
import ModuleInstance from '../src/main.js'
import { SceneObservations } from '../src/return-msc.js'

void it('reconciles manual Hog events and preserves returns arriving before send completion', () => {
	const state = Object.create(ModuleInstance.prototype) as ModuleInstance
	Object.assign(state, {
		activeScenes: new Set<string>(),
		observations: new SceneObservations(),
		checkFeedbacks: () => {},
	})
	const observations = (state as unknown as { observations: SceneObservations }).observations
	state.setSceneActive('36', true)
	assert.equal(state.isSceneActive('36'), true)
	observations.observe('36', false)
	state.setSceneActive('36', false)
	assert.equal(state.isSceneActive('36'), false)
	// Late completion of the outgoing GO must not overwrite Hog's returned Release.
	state.setSceneActive('36', true)
	assert.equal(state.isSceneActive('36'), false)
	assert.equal(state.isSceneActive('31'), false)
	observations.invalidate('36')
	state.setSceneActive('36', true)
	assert.equal(state.isSceneActive('36'), true)
	observations.observe('36', true)
	state.setSceneActive('036', true)
	observations.clear()
	assert.equal(state.isSceneActive('36'), true)
	state.resetSceneStates()
	assert.equal(state.isSceneActive('36'), false)
})
