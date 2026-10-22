export function httpsOrigin(value: string, allowed: string[]): string
export function apiUrl(value: string, origin: string): string
export function mediaUrl(value: string | null, origin: string, allowed: string[]): string | null
export function normalizeMedia(value: unknown, origin: string, allowed: string[], key?: string): unknown
