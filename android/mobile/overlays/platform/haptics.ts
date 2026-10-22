import { native } from './native-runtime'
export type HapticKind = 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning'
export function haptic(kind: HapticKind = 'light'): void { void native.haptic(kind) }
