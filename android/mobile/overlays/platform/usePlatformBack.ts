import { useEffect } from 'react'
import { native } from './native-runtime'

// The global controller owns hardware Back. Page/sheet handlers override history.
export function usePlatformBack(onBack?: () => void): void {
  useEffect(() => onBack ? native.registerBack(onBack) : undefined, [onBack])
}
