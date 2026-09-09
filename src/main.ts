import { InstanceBase, InstanceStatus, type SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, type ModuleConfig } from './config.js'
import { UpdateVariableDefinitions, type VariablesSchema } from './variables.js'
import { UpgradeScripts } from './upgrades.js'
import { UpdateActions, type ActionsSchema } from './actions.js'
import { UpdateFeedbacks, type FeedbacksSchema } from './feedbacks.js'
import { UpdatePresets } from './presets.js'
import { CommandQueue, type QueueItem } from './queue.js'
import { logSuccessfulTransmission } from './transmission-log.js'
import { TcpMidiTransport } from './transports/tcp.js'
import { UsbMidiTransport } from './transports/usb.js'
import { RtpMidiTransport } from './transports/rtp-midi.js'
import type { MidiTransport, TransportState } from './transports/types.js'

export type ModuleSchema = {
	config: ModuleConfig
	secrets: undefined
	actions: ActionsSchema
	feedbacks: FeedbacksSchema
	variables: VariablesSchema
}
export { UpgradeScripts }

export default class ModuleInstance extends InstanceBase<ModuleSchema> {
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
		this.commandQueue.clear()
		await this.transport?.disconnect()
	}
	async configUpdated(config: ModuleConfig): Promise<void> {
		this.commandQueue.clear()
		await this.transport?.disconnect()
		this.config = config
		this.resetSceneStates()
		await this.startTransport()
	}
	getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}
	enqueue(item: QueueItem): void {
		this.commandQueue.enqueue(item)
	}
	isSceneActive(scene: string): boolean {
		return this.activeScenes.has(scene)
	}
	setSceneActive(scene: string, active: boolean): void {
		if (active) this.activeScenes.add(scene)
		else this.activeScenes.delete(scene)
		this.checkFeedbacks('scene_state')
	}
	resetSceneStates(): void {
		this.activeScenes.clear()
		this.checkFeedbacks('scene_state')
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
		if (this.config.transport === 'usb') this.transport = new UsbMidiTransport(this.config.usbDevice, events)
		else if (this.config.transport === 'rtp-midi')
			this.transport = new RtpMidiTransport(
				this.config.host,
				this.config.port,
				this.config.rtpSessionName || 'Companion Hog MSC',
				events,
			)
		else this.transport = new TcpMidiTransport(this.config.host, this.config.port, events)
		await this.transport.connect()
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
			if (state === 'Connected') this.resetSceneStates()
		}
	}
	private async transmit(item: QueueItem): Promise<void> {
		if (this.transportState !== 'Connected' || !this.transport) throw new Error('Transport is not connected')
		await this.transport.send(item.bytes)
		logSuccessfulTransmission((level, message) => this.log(level, message), item.description, item.bytes)
	}
}
