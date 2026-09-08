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
