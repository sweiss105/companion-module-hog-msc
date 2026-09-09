import type ModuleInstance from './main.js'

export type FeedbacksSchema = {
	list_state: { type: 'boolean'; options: { list: string } }
	scene_return_active: { type: 'boolean'; options: { scene: string } }
	scene_return_known: { type: 'boolean'; options: { scene: string } }
	scene_return_mismatch: { type: 'boolean'; options: { scene: string } }
	scene_state: { type: 'boolean'; options: { scene: string } }
}

export function UpdateFeedbacks(self: ModuleInstance): void {
	const returned = (id: 'scene_return_active' | 'scene_return_known' | 'scene_return_mismatch') => ({
		name: {
			scene_return_active: 'Scene: Hog reported active',
			scene_return_known: 'Scene: return observation available',
			scene_return_mismatch: 'Scene: local/return mismatch',
		}[id],
		type: 'boolean' as const,
		defaultStyle: {},
		description:
			'Last received scene event, not a complete console state snapshot. Unknown after reset, input loss, or a new send.',
		options: [{ id: 'scene' as const, type: 'textinput' as const, label: 'Scene Number', default: '' }],
		callback: (feedback: { options: { scene: string } }) => {
			const scene = feedback.options.scene.trim()
			if (!/^\d+$/.test(scene)) return false
			const observed = self.getSceneObservation(scene)
			return id === 'scene_return_known'
				? observed !== undefined
				: id === 'scene_return_active'
					? observed === true
					: observed !== undefined && observed !== self.isSceneActive(scene)
		},
	})

	self.setFeedbackDefinitions({
		list_state: {
			name: 'List State',
			type: 'boolean',
			defaultStyle: {},
			description:
				'Active after GO/RESUME/Skip; inactive after Release. STOP retains state. Hog return events correct the same state.',
			options: [{ id: 'list', type: 'textinput', label: 'List Number', default: '', useVariables: true }],
			callback: (feedback) => {
				const list = feedback.options.list.trim()
				return /^\d+$/.test(list) && self.isListActive(list)
			},
		},
		scene_return_active: returned('scene_return_active'),
		scene_return_known: returned('scene_return_known'),
		scene_return_mismatch: returned('scene_return_mismatch'),
		scene_state: {
			name: 'Scene State',
			type: 'boolean',
			description: 'True when this scene is tracked as active; return MSC automatically corrects the state.',
			defaultStyle: {},
			options: [
				{
					id: 'scene',
					type: 'textinput',
					label: 'Scene Number',
					default: '',
					useVariables: true,
					tooltip: 'Updated after successful sends and reconciled with received Hog scene GO/Release events.',
				},
			],
			callback: async (feedback) => {
				const scene = feedback.options.scene.trim()
				return /^\d+$/.test(scene) && self.isSceneActive(scene)
			},
		},
	})
}
