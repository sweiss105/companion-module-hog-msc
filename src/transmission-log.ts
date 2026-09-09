import { formatBytes } from './msc.js'

export type TransmissionLogger = (level: 'info', message: string) => void

export function logSuccessfulTransmission(log: TransmissionLogger, description: string, bytes: Uint8Array): void {
	log('info', `Sent ${description}: ${formatBytes(bytes)}`)
}
