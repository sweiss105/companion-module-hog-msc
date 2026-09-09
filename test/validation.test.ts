import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { requireGoTarget } from '../src/validation.js'

void describe('Hog GO action validation', () => {
	void it('requires both List and Cue', () => {
		assert.throws(() => requireGoTarget(undefined, undefined), /requires both List and Cue/)
		assert.throws(() => requireGoTarget('48', undefined), /requires both List and Cue/)
		assert.throws(() => requireGoTarget(undefined, '1'), /requires both List and Cue/)
	})

	void it('accepts an explicit List and Cue', () => {
		assert.deepEqual(requireGoTarget('48', '1.2'), { list: '48', cue: '1.2' })
	})
})
