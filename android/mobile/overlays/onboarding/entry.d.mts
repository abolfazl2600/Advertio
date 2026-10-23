export const WELCOME_KEY: string
export function hasSeenWelcome(storage?: Pick<Storage, 'getItem'>): boolean
export function completeWelcome(storage?: Pick<Storage, 'setItem'>): void
