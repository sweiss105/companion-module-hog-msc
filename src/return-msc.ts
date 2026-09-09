/** Only the native scene GO/GO_OFF layout captured from Hog is accepted. */
export function parseSceneReturn(
	bytes: readonly number[],
	deviceId: number,
): { scene: string; active: boolean } | undefined {
	if (bytes.length < 11 || bytes.length > 64 || bytes.some((b) => !Number.isInteger(b) || b < 0 || b > 255)) return
	if (bytes[0] !== 0xf0 || bytes[1] !== 0x7f || bytes[2] !== deviceId || bytes[3] !== 2 || bytes[4] !== 1) return
	if (bytes[5] !== 1 && bytes[5] !== 0x0b) return
	if (bytes[6] !== 0 || bytes.at(-3) !== 0 || bytes.at(-2) !== 5 || bytes.at(-1) !== 0xf7) return
	const digits = bytes.slice(7, -3)
	if (!digits.length || digits.some((b) => b < 0x30 || b > 0x39)) return
	return { scene: String(BigInt(String.fromCharCode(...digits))), active: bytes[5] === 1 }
}

export class SceneObservations {
	private readonly values = new Map<string, boolean>()
	clear(): void {
		this.values.clear()
	}
	get(scene: string): boolean | undefined {
		return this.values.get(BigInt(scene).toString())
	}
	observe(scene: string, active: boolean): void {
		this.values.set(BigInt(scene).toString(), active)
	}
	invalidate(scene: string): void {
		this.values.delete(BigInt(scene).toString())
	}
}

// Explicit list targets only. A nonempty cue path is rejected so scenes
// cannot be mistaken for lists. STOP does not change active/released state.
export function parseListReturn(
	bytes: readonly number[],
	deviceId: number,
): { list: string; active: boolean } | undefined {
	if (bytes.length < 9 || bytes.length > 128 || bytes.some((b) => !Number.isInteger(b) || b < 0 || b > 255)) return
	if (
		bytes[0] !== 0xf0 ||
		bytes[1] !== 0x7f ||
		bytes[2] !== deviceId ||
		bytes[3] !== 2 ||
		bytes[4] !== 1 ||
		bytes.at(-1) !== 0xf7
	)
		return
	const command = bytes[5]
	if (![1, 3, 4, 0x0b].includes(command)) return
	const start = command === 4 ? 11 : 6
	if (command === 4 && bytes.slice(6, 11).some((b) => b > 127)) return
	// Native Hog list returns include an empty cue-path field (trailing NUL).
	const data = bytes.slice(start, bytes.at(-2) === 0 ? -2 : -1)
	const separator = data.indexOf(0)
	if (separator < 0) return
	const cue = String.fromCharCode(...data.slice(0, separator))
	const list = String.fromCharCode(...data.slice(separator + 1))
	if (!/^\d+$/.test(list) || (cue !== '' && !/^\d+(\.\d+)?$/.test(cue))) return
	if ((command === 1 || command === 4) && !cue) return
	return { list: BigInt(list).toString(), active: command !== 0x0b }
}
