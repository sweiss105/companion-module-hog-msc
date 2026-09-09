import assert from 'node:assert/strict'
import { it } from 'node:test'
import { logSuccessfulTransmission } from '../src/transmission-log.js'

void it('logs successful transmissions at info level with description and exact bytes', () => {
	const entries: Array<{ level: string; message: string }> = []
	logSuccessfulTransmission(
		(level, message) => entries.push({ level, message }),
		'MSC GO List 43 Cue 1',
		Uint8Array.from([0xf0, 0x7f, 0x01, 0x02, 0x01, 0x01, 0x31, 0x00, 0x34, 0x33, 0xf7]),
	)

	assert.deepEqual(entries, [
		{
			level: 'info',
			message: 'Sent MSC GO List 43 Cue 1: F0 7F 01 02 01 01 31 00 34 33 F7',
		},
	])
})
