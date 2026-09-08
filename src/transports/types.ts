export type TransportState = 'Connected' | 'Disconnected' | 'Reconnecting'

export interface MidiTransport {
	connect(): Promise<void>
	disconnect(): Promise<void>
	send(bytes: Uint8Array): Promise<void>
}

export type TransportEvents = {
	onState: (state: TransportState, message?: string) => void
	onDebug: (message: string) => void
}
