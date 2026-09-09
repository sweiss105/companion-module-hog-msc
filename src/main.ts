import { UsbReturnInput } from './transports/usb-input.js'
import { parseListReturn, parseSceneReturn, SceneObservations } from './return-msc.js'
import { InstanceBase, InstanceStatus, type SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, type ModuleConfig } from './config.js'
import { UpdateVariableDefinitions, type VariablesSchema } from './variables.js'
import { UpgradeScripts } from './upgrades.js'
import { UpdateActions, type ActionsSchema } from './actions.js'
import { UpdateFeedbacks, type FeedbacksSchema } from './feedbacks.js'
import { UpdatePresets } from './presets.js'
import { CommandQueue, type QueueItem } from './queue.js'
import { logSuccessfulTransmission } from './transmission-log.js'
import { UsbMidiTransport } from './transports/usb.js'
import type { MidiTransport, TransportState } from './transports/types.js'
import { encodeListCommand, encodeScene, MscCommand, type DeviceAddress } from './msc.js'

export type ModuleSchema = {
	config: ModuleConfig
	secrets: undefined
	actions: ActionsSchema
	feedbacks: FeedbacksSchema
	variables: VariablesSchema
}
export { UpgradeScripts }

export default class ModuleInstance extends InstanceBase<ModuleSchema> {
	private returnInput?: UsbReturnInput
	private returnConnected = false
	private readonly activeLists = new Set<string>()
	private readonly listObservations = new SceneObservations()
	private readonly observations = new SceneObservations()
	config!: ModuleConfig
	private transport?: MidiTransport
	private transportState: TransportState = 'Disconnected'
	private readonly activeScenes = new Set<string>()
	private readonly commandQueue = new CommandQueue(
		() => Math.max(0, Math.min(500, Number(this.config?.interCommandDelay ?? 0))),
		async (item) => this.transmit(item),
		(error, item) => this.log('error', `${item.description} was not transmitted: ${error.message}`),
	)

	constructor(internal: unknown) {
		super(internal)
	}
	async init(config: ModuleConfig): Promise<void> {
		this.config = config
		this.updateDefinitions()
		this.setTransportState('Disconnected')
		await this.startTransport()
	}
	async destroy(): Promise<void> {
		this.returnInput?.stop()
		this.commandQueue.clear()
		await this.transport?.disconnect()
	}
	async configUpdated(config: ModuleConfig): Promise<void> {
		this.returnInput?.stop()
		this.commandQueue.clear()
		await this.transport?.disconnect()
		this.config = config
		this.resetSceneStates()
		this.resetListStates()
		await this.startTransport()
	}
	getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}
	enqueue(item: QueueItem): void {
		this.commandQueue.enqueue(item)
	}
	releaseTracked(scope: 'lists' | 'scenes' | 'all', address: DeviceAddress): void {
		// Snapshot both sets before enqueueing: sends and return events can change tracking.
		const lists = scope === 'scenes' ? [] : [...this.activeLists]
		const scenes = scope === 'lists' ? [] : [...this.activeScenes]
		if (lists.length + scenes.length === 0) {
			this.log('info', `Release All ${scope}: no tracked active targets; nothing sent`)
			return
		}
		if (this.transportState !== 'Connected') throw new Error('Transport is not connected')
		this.log(
			'info',
			`Release All ${scope}: queueing ${lists.length} tracked list(s) and ${scenes.length} tracked scene(s)`,
		)
		for (const list of lists) {
			this.enqueue({
				bytes: encodeListCommand(address, MscCommand.GoOff, list),
				description: `MSC Release List ${list}`,
				onTransmitted: () => this.setListActive(list, false),
			})
		}
		for (const scene of scenes) {
			this.enqueue({
				bytes: encodeScene(address, scene, true),
				description: `MSC Release Scene ${scene}`,
				onTransmitted: () => this.setSceneActive(scene, false),
			})
		}
	}
	isSceneActive(scene: string): boolean {
		return this.activeScenes.has(BigInt(scene).toString())
	}
	setSceneActive(scene: string, active: boolean): void {
		active = this.observations.get(scene) ?? active
		if (active) this.activeScenes.add(BigInt(scene).toString())
		else this.activeScenes.delete(BigInt(scene).toString())
		this.checkFeedbacks('scene_state', 'scene_return_active', 'scene_return_known', 'scene_return_mismatch')
	}
	resetSceneStates(): void {
		this.observations.clear()
		this.activeScenes.clear()
		this.checkFeedbacks('scene_state', 'scene_return_active', 'scene_return_known', 'scene_return_mismatch')
	}
	resetListStates(): void {
		this.activeLists.clear()
		this.listObservations.clear()
		this.checkFeedbacks('list_state')
	}
	isListActive(list: string): boolean {
		return this.activeLists.has(BigInt(list).toString())
	}
	setListActive(list: string, active: boolean): void {
		active = this.listObservations.get(list) ?? active
		if (active) this.activeLists.add(BigInt(list).toString())
		else this.activeLists.delete(BigInt(list).toString())
		this.checkFeedbacks('list_state')
	}
	getSceneObservation(scene: string): boolean | undefined {
		return this.observations.get(scene)
	}
	private startReturnInput(): void {
		this.observations.clear()
		this.listObservations.clear()
		if (!this.config.returnEnabled) return
		this.returnInput = new UsbReturnInput(
			this.config.returnDevice ?? '',
			(bytes) => {
				const listEvent = parseListReturn(bytes, this.config.returnDeviceId ?? 1)
				if (listEvent) {
					this.listObservations.observe(listEvent.list, listEvent.active)
					this.log(
						'info',
						`Received MSC ${listEvent.active ? 'Active' : 'Release'} List ${listEvent.list}; local state ${this.isListActive(listEvent.list) === listEvent.active ? 'matches' : 'corrected from Hog'}`,
					)
					this.setListActive(listEvent.list, listEvent.active)
					return
				}
				const event = parseSceneReturn(bytes, this.config.returnDeviceId ?? 1)
				if (!event) return
				this.observations.observe(event.scene, event.active)
				this.log(
					'info',
					`Received MSC ${event.active ? 'Go' : 'Release'} Scene ${event.scene}; local state ${this.isSceneActive(event.scene) === event.active ? 'matches' : 'corrected from Hog'}`,
				)
				this.setSceneActive(event.scene, event.active)
			},
			(connected) => {
				if (connected !== this.returnConnected)
					this.log(connected ? 'info' : 'warn', `Return MIDI input ${connected ? 'connected' : 'unavailable'}`)
				this.returnConnected = connected
				if (!connected) {
					this.observations.clear()
					this.listObservations.clear()
				}
				this.checkFeedbacks('scene_return_active', 'scene_return_known', 'scene_return_mismatch')
			},
		)
		this.returnInput.start()
	}
	private updateDefinitions(): void {
		UpdateActions(this)
		UpdateFeedbacks(this)
		UpdatePresets(this)
		UpdateVariableDefinitions(this)
	}
	private async startTransport(): Promise<void> {
		const events = {
			onState: (state: TransportState, message?: string) => {
				this.setTransportState(state)
				if (message) this.log('debug', message)
			},
			onDebug: (message: string) => this.log('debug', message),
		}
		if (this.config.transport && this.config.transport !== 'usb') {
			this.setTransportState('Disconnected')
			this.updateStatus(
				InstanceStatus.BadConfig,
				'Select USB MIDI and an output, then save. Network MIDI is no longer supported.',
			)
			return
		}
		this.transport = new UsbMidiTransport(this.config.usbDevice, events)
		await this.transport.connect()
		this.startReturnInput()
	}
	private setTransportState(state: TransportState): void {
		const changed = state !== this.transportState
		this.transportState = state
		this.setVariableValues({ transport_status: state })
		this.updateStatus(
			state === 'Connected'
				? InstanceStatus.Ok
				: state === 'Reconnecting'
					? InstanceStatus.Connecting
					: InstanceStatus.Disconnected,
		)
		if (changed) {
			this.log(state === 'Connected' ? 'info' : 'warn', `Transport ${state.toLowerCase()}`)
			if (state !== 'Connected') {
				const discarded = this.commandQueue.clear()
				if (discarded) this.log('warn', `Discarded ${discarded} queued command(s)`)
			}
			if (state === 'Connected') {
				this.resetSceneStates()
				this.resetListStates()
			}
		}
	}
	private async transmit(item: QueueItem): Promise<void> {
		if (this.transportState !== 'Connected' || !this.transport) throw new Error('Transport is not connected')
		const scene = parseSceneReturn([...item.bytes], item.bytes[2])
		if (scene) {
			this.observations.invalidate(scene.scene)
			this.checkFeedbacks('scene_return_active', 'scene_return_known', 'scene_return_mismatch')
		}
		const list = parseListReturn([...item.bytes], item.bytes[2])
		if (list) this.listObservations.invalidate(list.list)
		await this.transport.send(item.bytes)
		logSuccessfulTransmission((level, message) => this.log(level, message), item.description, item.bytes)
	}
}
