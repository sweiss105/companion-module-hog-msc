import type { CompanionInputFieldTextInput } from '@companion-module/base'
import type ModuleInstance from './main.js'
import {
	MscCommand,
	encodeGo,
	encodeListCommand,
	encodeOpenCuePath,
	encodeScene,
	encodeTimedGo,
	parseRawSysex,
	type DeviceAddress,
} from './msc.js'
import { resolveOptionalNumber } from './validation.js'

type ListOptions = { list: string }
type GoOptions = { list: string; cue: string }
type SceneOptions = { scene: string }
type PageOptions = { page: string }
type RawOptions = { sysex: string }

export type ActionsSchema = {
	go: { options: GoOptions }
	stop: { options: ListOptions }
	resume: { options: ListOptions }
	release: { options: ListOptions }
	skip_forward: { options: GoOptions }
	skip_back: { options: GoOptions }
	change_page: { options: PageOptions }
	go_scene: { options: SceneOptions }
	release_scene: { options: SceneOptions }
	toggle_scene: { options: SceneOptions }
	reset_scene_states: { options: Record<string, never> }
	raw_sysex: { options: RawOptions }
}

const textField = <TKey extends string>(
	id: TKey,
	label: string,
	tooltip: string,
): CompanionInputFieldTextInput<TKey> => ({
	id,
	type: 'textinput',
	label,
	default: '',
	useVariables: true,
	tooltip,
})

export function UpdateActions(self: ModuleInstance): void {
	const address = (): DeviceAddress =>
		self.config.deviceMode === 'broadcast' ? 'broadcast' : Number(self.config.deviceId ?? 1)
	const resolve = async (value: unknown, kind: 'whole' | 'cue', label: string) =>
		resolveOptionalNumber(value, async (input) => input, kind, label)
	const enqueue = (bytes: Uint8Array, description: string, onTransmitted?: () => void) =>
		self.enqueue({ bytes, description, onTransmitted })

	self.setActionDefinitions({
		go: {
			name: 'GO',
			description: 'GO, GO List, or GO List Cue depending on which fields are filled.',
			options: [
				textField('list', 'List', 'Blank means the currently chosen playback.'),
				textField('cue', 'Cue', 'Decimal cues are supported. Requires List.'),
			],
			callback: async (event) => {
				try {
					const list = await resolve(event.options.list, 'whole', 'List')
					const cue = await resolve(event.options.cue, 'cue', 'Cue')
					if (cue && !list) throw new Error('Cue requires a List')
					enqueue(encodeGo(address(), list, cue), `MSC GO${list ? ` List ${list}` : ''}${cue ? ` Cue ${cue}` : ''}`)
				} catch (error) {
					self.log('error', error instanceof Error ? error.message : String(error))
				}
			},
		},
		stop: listAction('STOP', MscCommand.Stop),
		resume: listAction('RESUME', MscCommand.Resume),
		release: listAction('Release', MscCommand.GoOff),
		skip_forward: timedAction('Skip Forward'),
		skip_back: timedAction('Skip Back'),
		change_page: {
			name: 'Change Page',
			options: [textField('page', 'Page Number', 'Required whole-number Hog page.')],
			callback: async (event) => {
				try {
					const page = await resolve(event.options.page, 'whole', 'Page')
					if (!page) throw new Error('Page is required')
					enqueue(encodeOpenCuePath(address(), page), `MSC Change Page ${page}`)
				} catch (error) {
					logError(error)
				}
			},
		},
		go_scene: sceneAction('Go Scene', false),
		release_scene: sceneAction('Release Scene', true),
		toggle_scene: {
			name: 'Toggle Scene',
			options: [textField('scene', 'Scene Number', 'Required whole-number Hog scene.')],
			callback: async (event) => {
				try {
					const scene = await resolve(event.options.scene, 'whole', 'Scene')
					if (!scene) throw new Error('Scene is required')
					const release = self.isSceneActive(scene)
					enqueue(encodeScene(address(), scene, release), `MSC ${release ? 'Release' : 'Go'} Scene ${scene}`, () =>
						self.setSceneActive(scene, !release),
					)
				} catch (error) {
					logError(error)
				}
			},
		},
		reset_scene_states: { name: 'Reset All Scene States', options: [], callback: async () => self.resetSceneStates() },
		raw_sysex: {
			name: 'Raw SysEx',
			description: 'Transmit the supplied bytes unchanged. This does not affect scene state.',
			options: [
				textField('sysex', 'SysEx bytes', 'Example: F0 7F 01 02 01 01 31 00 33 F7. Bytes are not reformatted.'),
			],
			callback: async (event) => {
				try {
					enqueue(parseRawSysex(event.options.sysex), 'Raw SysEx')
				} catch (error) {
					logError(error)
				}
			},
		},
	})

	function logError(error: unknown): void {
		self.log('error', error instanceof Error ? error.message : String(error))
	}
	function listAction(name: string, command: 0x02 | 0x03 | 0x0b) {
		return {
			name,
			options: [textField('list', 'List', 'Optional. Blank targets the currently chosen playback.')],
			callback: async (event: { options: ListOptions }) => {
				try {
					const list = await resolve(event.options.list, 'whole', 'List')
					enqueue(encodeListCommand(address(), command, list), `MSC ${name}${list ? ` List ${list}` : ''}`)
				} catch (error) {
					logError(error)
				}
			},
		}
	}
	function timedAction(name: string) {
		return {
			name,
			description: 'Immediate TIMED_GO to an explicit cue. Hog MSC requires the destination cue.',
			options: [
				textField('list', 'List', 'Optional list.'),
				textField('cue', 'Destination Cue', 'Required cue, including decimals.'),
			],
			callback: async (event: { options: GoOptions }) => {
				try {
					const list = await resolve(event.options.list, 'whole', 'List')
					const cue = await resolve(event.options.cue, 'cue', 'Destination Cue')
					if (!cue) throw new Error(`${name} requires a destination Cue`)
					enqueue(encodeTimedGo(address(), list, cue), `MSC ${name}${list ? ` List ${list}` : ''} Cue ${cue}`)
				} catch (error) {
					logError(error)
				}
			},
		}
	}
	function sceneAction(name: string, release: boolean) {
		return {
			name,
			options: [textField('scene', 'Scene Number', 'Required whole-number Hog scene.')],
			callback: async (event: { options: SceneOptions }) => {
				try {
					const scene = await resolve(event.options.scene, 'whole', 'Scene')
					if (!scene) throw new Error('Scene is required')
					enqueue(encodeScene(address(), scene, release), `MSC ${name} ${scene}`, () =>
						self.setSceneActive(scene, !release),
					)
				} catch (error) {
					logError(error)
				}
			},
		}
	}
}
