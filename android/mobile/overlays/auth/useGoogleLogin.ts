import { useLayoutEffect, useRef } from 'react'

// Current Android version uses OTP only. Keep the existing view contract without
// loading GIS, registering a native provider or making an authentication request.
export function useGoogleLogin() {
  const buttonRef = useRef<HTMLDivElement | null>(null)
  useLayoutEffect(() => {
    const container = buttonRef.current
    if (!container) return
    container.replaceChildren()
    container.hidden = true
    container.style.setProperty('display', 'none', 'important')
    container.setAttribute('aria-hidden', 'true')
    container.inert = true
  })
  return { buttonRef, status: 'disabled' as const, isSigningIn: false, isError: false }
}
