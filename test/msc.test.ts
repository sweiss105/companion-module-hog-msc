import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
	encodeGo,
	encodeListCommand,
	encodeOpenCuePath,
	encodeScene,
	encodeTimedGo,
	MscCommand,
	parseRawSysex,
} from '../src/msc.js'

const hex = (bytes: Uint8Array) => Buffer.from(bytes).toString('hex').toUpperCase()

void describe('Hog MSC encoding', () => {
	void it('encodes ETC documented GO List 1 Cue 34.4', () => {
		assert.equal(hex(encodeGo(1, '1', '34.4')), 'F07F0102010133342E340031F7')
	})
	void it('encodes list controls, immediate TIMED_GO, page and scene path 5', () => {
		assert.equal(hex(encodeListCommand(1, MscCommand.Stop, '3')), 'F07F010201020033F7')
		assert.equal(hex(encodeTimedGo(1, '1', '2')), 'F07F010201040000000000320031F7')
		assert.equal(hex(encodeOpenCuePath(1, '4')), 'F07F0102011D34F7')
		assert.equal(hex(encodeScene(1, '12')), 'F07F010201010031320005F7')
	})
	void it('matches captured Hog Scene 36 GO and Release, independently of chosen master', () => {
		// Native MIDI input captures on 2026-09-09; GO also passed the physical
		// Scene 31 chosen / Scene 36 targeted Raw SysEx comparison.
		assert.equal(hex(encodeScene(1, '36')), 'F07F010201010033360005F7')
		assert.equal(hex(encodeScene(1, '36', true)), 'F07F0102010B0033360005F7')
		assert.equal(hex(encodeScene(1, '31')), 'F07F010201010033310005F7')
	})
	void it('uses all-call and validates opaque SysEx without changing it', () => {
		assert.equal(hex(encodeGo('broadcast')), 'F07F7F020101F7')
		assert.equal(hex(parseRawSysex('f0 7f 01 f7')), 'F07F01F7')
		assert.throws(() => parseRawSysex('F0 7G F7'))
	})
})
