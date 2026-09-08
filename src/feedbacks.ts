import type ModuleInstance from './main.js'

export type FeedbacksSchema = {
	scene_state: { type: 'boolean'; options: { scene: string } }
}

export function UpdateFeedbacks(self: ModuleInstance): void {
	self.setFeedbackDefinitions({
		scene_state: {
			name: 'Scene State',
			type: 'boolean',
			description: 'True when this scene is locally tracked as active.',
			defaultStyle: {},
			options: [
				{
					id: 'scene',
					type: 'textinput',
					label: 'Scene Number',
					default: '',
					useVariables: true,
					tooltip: 'Tracked locally from successfully transmitted scene actions; Hog does not confirm this state.',
				},
			],
			callback: async (feedback) => {
				const scene = feedback.options.scene.trim()
				return /^\d+$/.test(scene) && self.isSceneActive(scene)
			},
		},
	})
}
