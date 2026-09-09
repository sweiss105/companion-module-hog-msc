import type { CompanionPresetDefinitions, CompanionPresetSection } from '@companion-module/base'
import type ModuleInstance from './main.js'
import type { ModuleSchema } from './main.js'

const style = (text: string) => ({
	text,
	size: 'auto' as const,
	color: 0xffffff,
	bgcolor: 0x000000,
	show_topbar: false,
})

export function UpdatePresets(self: ModuleInstance): void {
	const ids = [
		'go',
		'stop',
		'resume',
		'release',
		'release_all_lists',
		'release_all_scenes',
		'release_all',
		'skip_forward',
		'skip_back',
		'change_page',
		'go_scene',
		'release_scene',
		'toggle_scene',
		'reset_scene_states',
	]
	const structure: CompanionPresetSection<ModuleSchema>[] = [{ id: 'hog-msc', name: 'Hog 5 MSC', definitions: ids }]
	const presets: CompanionPresetDefinitions<ModuleSchema> = {
		go: preset('GO', 'go', { list: '', cue: '' }),
		stop: preset('STOP', 'stop', { list: '' }),
		resume: preset('RESUME', 'resume', { list: '' }),
		release: preset('RELEASE', 'release', { list: '' }),
		release_all_lists: preset('RELEASE ALL\nLISTS', 'release_all_lists', {}),
		release_all_scenes: preset('RELEASE ALL\nSCENES', 'release_all_scenes', {}),
		release_all: preset('RELEASE ALL', 'release_all', {}),
		skip_forward: preset('SKIP\nFORWARD', 'skip_forward', { list: '', cue: '' }),
		skip_back: preset('SKIP\nBACK', 'skip_back', { list: '', cue: '' }),
		change_page: preset('PAGE #', 'change_page', { page: '' }),
		go_scene: preset('GO\nSCENE', 'go_scene', { scene: '' }),
		release_scene: preset('RELEASE\nSCENE', 'release_scene', { scene: '' }),
		toggle_scene: {
			...preset('TOGGLE\nSCENE', 'toggle_scene', { scene: '' }),
			feedbacks: [{ feedbackId: 'scene_state', options: { scene: '' }, style: { bgcolor: 0x008000 } }],
		},
		reset_scene_states: preset('RESET SCENE\nSTATES', 'reset_scene_states', {}),
	}
	self.setPresetDefinitions(structure, presets)
}

function preset<T extends keyof ModuleSchema['actions']>(
	text: string,
	actionId: T,
	options: ModuleSchema['actions'][T]['options'],
) {
	return {
		type: 'simple' as const,
		name: text.replace('\n', ' '),
		style: style(text),
		steps: [{ down: [{ actionId, options }], up: [] }],
		feedbacks: [],
	}
}
