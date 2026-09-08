export const MscCommand = {
	Go: 0x01,
	Stop: 0x02,
	Resume: 0x03,
	TimedGo: 0x04,
	GoOff: 0x0b,
	OpenCuePath: 0x1d,
} as const

const LIGHTING_FORMAT = 0x01
const BROADCAST_DEVICE_ID = 0x7f

export type DeviceAddress = number | 'broadcast'

function ascii(value: string): number[] {
	return [...Buffer.from(value, 'ascii')]
}

function envelope(device: DeviceAddress, command: number, data: number[] = []): Uint8Array {
	const deviceId = device === 'broadcast' ? BROADCAST_DEVICE_ID : device
	if (!Number.isInteger(deviceId) || deviceId < 0 || deviceId > 0x7f) throw new Error('MSC Device ID must be 0–127')
	return Uint8Array.from([0xf0, 0x7f, deviceId, 0x02, LIGHTING_FORMAT, command, ...data, 0xf7])
}

function targetData(cue?: string, list?: string, path?: string): number[] {
	const data: number[] = []
	if (cue !== undefined || list !== undefined || path !== undefined) data.push(...ascii(cue ?? ''))
	if (list !== undefined || path !== undefined) data.push(0x00, ...ascii(list ?? ''))
	if (path !== undefined) data.push(0x00, ...ascii(path))
	return data
}

export function encodeGo(device: DeviceAddress, list?: string, cue?: string): Uint8Array {
	return envelope(device, MscCommand.Go, targetData(cue, list))
}

export function encodeListCommand(device: DeviceAddress, command: 0x02 | 0x03 | 0x0b, list?: string): Uint8Array {
	return envelope(device, command, list === undefined ? [] : targetData(undefined, list))
}

export function encodeTimedGo(device: DeviceAddress, list: string | undefined, cue: string): Uint8Array {
	// Five zero bytes encode an immediate (zero-time) transition in Hog MSC.
	return envelope(device, MscCommand.TimedGo, [0, 0, 0, 0, 0, ...targetData(cue, list)])
}

export function encodeOpenCuePath(device: DeviceAddress, page: string): Uint8Array {
	return envelope(device, MscCommand.OpenCuePath, ascii(page))
}

export function encodeScene(device: DeviceAddress, scene: string, release = false): Uint8Array {
	return envelope(device, release ? MscCommand.GoOff : MscCommand.Go, targetData(scene, '', '5'))
}

export function parseRawSysex(input: string): Uint8Array {
	const tokens = input.trim().split(/\s+/).filter(Boolean)
	if (tokens.length === 0) throw new Error('Raw SysEx cannot be blank')
	if (tokens.some((token) => !/^[0-9a-fA-F]{2}$/.test(token))) {
		throw new Error('Raw SysEx must contain two-digit hexadecimal bytes separated by whitespace')
	}
	const bytes = Uint8Array.from(tokens.map((token) => Number.parseInt(token, 16)))
	if (bytes[0] !== 0xf0 || bytes.at(-1) !== 0xf7) throw new Error('Raw SysEx must begin with F0 and end with F7')
	return bytes
}

export function formatBytes(bytes: Uint8Array): string {
	return [...bytes].map((byte) => byte.toString(16).padStart(2, '0').toUpperCase()).join(' ')
}
