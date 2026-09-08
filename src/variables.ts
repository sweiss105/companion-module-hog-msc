import type ModuleInstance from './main.js'

export type VariablesSchema = { transport_status: string }

export function UpdateVariableDefinitions(self: ModuleInstance): void {
	self.setVariableDefinitions({ transport_status: { name: 'Transport status' } })
}
