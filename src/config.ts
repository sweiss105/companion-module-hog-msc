import type { SomeCompanionConfigField } from '@companion-module/base'
import { listMidiInputs } from './transports/usb-input.js'
import { listMidiOutputs } from './transports/usb.js'

export type ModuleConfig = {
	returnEnabled?: boolean
	returnDevice?: string
	returnDeviceId?: number
	transport?: string // Retained to reject unsupported transport values in older configurations.
	deviceMode: 'specific' | 'broadcast'
	deviceId: number
	interCommandDelay: number
	usbDevice: string
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	let outputs: string[] = []
	try {
		outputs = listMidiOutputs()
	} catch {
		/* MIDI discovery can be unavailable on CI. */
	}
	let inputs: string[] = []
	try {
		inputs = listMidiInputs()
	} catch {
		/* Input discovery may be unavailable. */
	}
	return [
		{ type: 'checkbox', id: 'returnEnabled', label: 'Monitor return MSC (USB input)', width: 12, default: false },
		{
			type: 'dropdown',
			id: 'returnDevice',
			label: 'Return MIDI input',
			width: 12,
			default: '',
			choices: inputs.map((name) => ({ id: name, label: name })),
		},
		{ type: 'number', id: 'returnDeviceId', label: 'Return MSC Device ID', width: 6, min: 0, max: 126, default: 1 },
		{
			type: 'dropdown',
			id: 'transport',
			label: 'Transport',
			width: 6,
			default: 'usb',
			choices: [{ id: 'usb', label: 'USB MIDI' }],
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
	]
}
