import assert from 'node:assert/strict'
import { it } from 'node:test'
import { UsbMidiTransport } from '../src/transports/usb.js'

void it('detects idle removal, closes handles, retries, and stops polling on disconnect', async (t) => {
	t.mock.timers.enable({ apis: ['setInterval'] })
	let available = true
	let failOpen = false
	let failSend = false
	let created = 0
	let opened = 0
	let closed = 0
	let sent = 0
	const states: string[] = []
	const transport = new UsbMidiTransport('test', { onState: (s) => states.push(s), onDebug: () => {} }, () => {
		created++
		let isOpen = false
		return {
			getPortCount: () => (available ? 1 : 0),
			getPortName: () => 'test',
			openPort: () => {
				if (failOpen) throw new Error('open failed')
				isOpen = true
				opened++
			},
			closePort: () => {
				if (isOpen) closed++
				isOpen = false
			},
			sendMessage: () => {
				if (failSend) throw new Error('send failed')
				sent++
			},
		}
	})
	await transport.connect()
	await transport.connect()
	assert.equal(opened, 1)
	available = false
	t.mock.timers.tick(2000)
	assert.equal(closed, 1)
	assert.deepEqual(states, ['Connected', 'Reconnecting'])
	await assert.rejects(transport.send(new Uint8Array([1])))
	t.mock.timers.tick(2000)
	assert.equal(states.length, 2)
	available = true
	failOpen = true
	t.mock.timers.tick(2000)
	assert.equal(states.length, 2)
	failOpen = false
	t.mock.timers.tick(2000)
	assert.equal(opened, 2)
	await transport.send(new Uint8Array([1]))
	assert.equal(sent, 1)
	failSend = true
	await assert.rejects(transport.send(new Uint8Array([1])))
	assert.equal(closed, 2)
	failSend = false
	t.mock.timers.tick(2000)
	assert.equal(opened, 3)
	await transport.disconnect()
	const before = created
	t.mock.timers.tick(10000)
	assert.equal(created, before)
	assert.equal(closed, 3)
	assert.deepEqual(states, ['Connected', 'Reconnecting', 'Connected', 'Reconnecting', 'Connected', 'Disconnected'])
})
