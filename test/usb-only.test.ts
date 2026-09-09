import assert from 'node:assert/strict'
import { it } from 'node:test'
import ModuleInstance from '../src/main.js'

void it('blocks legacy network configurations before opening any MIDI transport or input', async () => {
	for (const transport of ['tcp', 'rtp-midi', 'unknown']) {
		const state = Object.create(ModuleInstance.prototype) as ModuleInstance
		const messages: string[] = []
		Object.assign(state, {
			config: { transport, usbDevice: 'previously selected output' },
			setTransportState: () => {},
			updateStatus: (_status: unknown, message: string) => messages.push(message),
			startReturnInput: () => assert.fail('Must not open input'),
		})
		await (state as unknown as { startTransport(): Promise<void> }).startTransport()
		assert.match(messages[0], /Select USB MIDI/)
		assert.equal((state as unknown as { transport?: unknown }).transport, undefined)
	}
})
