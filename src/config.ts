import type { SomeCompanionConfigField } from '@companion-module/base'
import { listMidiOutputs } from './transports/usb.js'

export type ModuleConfig = {
	transport: 'usb' | 'rtp-midi' | 'tcp'
	deviceMode: 'specific' | 'broadcast'
	deviceId: number
	interCommandDelay: number
	usbDevice: string
	host: string
	port: number
	rtpSessionName: string
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	let outputs: string[] = []
	try {
		outputs = listMidiOutputs()
	} catch {
		/* MIDI discovery can be unavailable on CI. */
	}
	return [
		{
			type: 'dropdown',
			id: 'transport',
			label: 'Transport',
			width: 6,
			default: 'usb',
			choices: [
				{ id: 'usb', label: 'USB MIDI' },
				{ id: 'rtp-midi', label: 'RTP-MIDI / AppleMIDI' },
				{ id: 'tcp', label: 'Raw MIDI over TCP' },
			],
		},
		{
			type: 'dropdown',
			id: 'deviceMode',
			label: 'MSC Device',
			width: 6,
			default: 'specific',
			choices: [
				{ id: 'specific', label: 'Specific Device ID' },
				{ id: 'broadcast', label: 'Broadcast / All-call' },
			],
		},
		{
			type: 'number',
			id: 'deviceId',
			label: 'MSC Device ID (decimal)',
			width: 4,
			min: 0,
			max: 126,
			default: 1,
			tooltip: 'Must match the MSC Device ID configured on the Hog. Ignored in Broadcast mode.',
		},
		{
			type: 'number',
			id: 'interCommandDelay',
			label: 'Inter-command delay (ms)',
			width: 4,
			min: 0,
			max: 500,
			default: 0,
		},
		{
			type: 'dropdown',
			id: 'usbDevice',
			label: 'USB MIDI output',
			width: 12,
			default: outputs[0] ?? '',
			choices: outputs.map((name) => ({ id: name, label: name })),
		},
		{ type: 'textinput', id: 'host', label: 'Remote host or IP address', width: 8, default: '' },
		{ type: 'number', id: 'port', label: 'Remote port', width: 4, min: 1, max: 65535, default: 5004 },
		{
			type: 'textinput',
			id: 'rtpSessionName',
			label: 'Local RTP-MIDI session name (optional)',
			width: 12,
			default: 'Companion Hog MSC',
		},
	]
}
