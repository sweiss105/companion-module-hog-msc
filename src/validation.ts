export async function resolveOptionalNumber(
	value: unknown,
	parseVariables: (value: string) => Promise<string>,
	kind: 'whole' | 'cue',
	label: string,
): Promise<string | undefined> {
	const input = typeof value === 'string' || typeof value === 'number' ? String(value) : ''
	const resolved = (await parseVariables(input)).trim()
	if (resolved === '') return undefined
	const pattern = kind === 'whole' ? /^\d+$/ : /^\d+(?:\.\d+)?$/
	if (!pattern.test(resolved))
		throw new Error(`${label} must be a non-negative ${kind === 'whole' ? 'whole number' : 'number'}`)
	return resolved
}

export function requireGoTarget(list: string | undefined, cue: string | undefined): { list: string; cue: string } {
	if (!list || !cue) throw new Error('GO requires both List and Cue on Hog OS 5')
	return { list, cue }
}
