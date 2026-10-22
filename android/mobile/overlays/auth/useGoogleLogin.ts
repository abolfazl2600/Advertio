import { useEffect, useRef, useState } from 'react'
import { Capacitor, registerPlugin } from '@capacitor/core'
import { useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import { API } from '@/shared/api/endpoints'
import { acceptSession, session } from '@/shared/stores/auth.store'
import { createGoogleLogin } from '@/shared/auth/google.mjs'

const bridge = registerPlugin<{
  configuration(): Promise<{available: boolean}>; signIn(): Promise<{idToken: string}>; clear(): Promise<void>
}>('AdvertioGoogleSignIn')
const login = createGoogleLogin({native: bridge, epoch: session.epoch, accept: acceptSession,
  exchange: async (credential) => (await apiClient.post<{token: string; userId: string}>(API.auth.provider('google'), {credential})).data })
// Provider state must clear even when the login form is unmounted after sign-in.
window.addEventListener('advertio:signed-out', () => { void login.clear().catch(() => {}) })
export function useGoogleLogin() {
  const buttonRef = useRef<HTMLDivElement | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'disabled' | 'unavailable'>('loading')
  const [isSigningIn, setSigningIn] = useState(false)
  const [isError, setError] = useState(false)
  const client = useQueryClient()
  useEffect(() => {
    let closed = false
    const container = buttonRef.current
    if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'android') { setStatus('unavailable'); return }
    const button = document.createElement('button')
    button.type = 'button'; button.textContent = 'Continue with Google'
    button.style.cssText = 'min-height:48px;padding:12px 20px;border:1px solid currentColor;border-radius:6px;font:inherit;color:inherit;background:transparent;cursor:pointer'
    button.onclick = () => {
      if (button.disabled) return
      button.disabled = true; setSigningIn(true); setError(false)
      void login.signIn().then((accepted) => { if (accepted && !closed) void client.invalidateQueries() })
        .catch((error: unknown) => { if (!closed && !(error instanceof Error && error.message === 'GOOGLE_CANCELLED')) setError(true) })
        .finally(() => { if (!closed) { button.disabled = false; setSigningIn(false) } })
    }
    void bridge.configuration().then(({available}) => {
      if (closed) return
      setStatus(available ? 'ready' : 'disabled')
      if (available && container) container.replaceChildren(button)
    }).catch(() => { if (!closed) setStatus('unavailable') })
    return () => { closed = true; button.onclick = null; button.remove() }
  }, [client])
  return {buttonRef, status, isSigningIn, isError}
}
