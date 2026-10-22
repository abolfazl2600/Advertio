import { useCallback, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import { API } from '@/shared/api/endpoints'
import { apiUrl } from '@/shared/api/policy.mjs'
import { bindSessionCleanup, session, useAuthStore } from '@/shared/stores/auth.store'

async function validate(token: string): Promise<string> {
  const origin = apiClient.defaults.baseURL!
  const response = await fetch(apiUrl(API.auth.me, origin), {
    headers: { Authorization: `Bearer ${token}` }, redirect: 'error', signal: AbortSignal.timeout(10_000),
  })
  if (response.status === 401) throw Object.assign(new Error('UNAUTHORIZED'), {code: 'UNAUTHORIZED'})
  if (!response.ok) throw new Error('RESTORE_UNAVAILABLE')
  const profile = await response.json() as {userId?: string; id?: string}
  const subject = profile.userId ?? profile.id
  if (!subject) throw new Error('RESTORE_IDENTITY_UNAVAILABLE')
  return subject
}
export function useSession() {
  const state = useAuthStore()
  const client = useQueryClient()
  useEffect(() => bindSessionCleanup(() => { void client.cancelQueries(); client.clear() }), [client])
  useEffect(() => {
    if (useAuthStore.getState().status === 'idle') void session.restore(validate)
  }, [])
  useEffect(() => {
    if (!state.claims) return
    const check = () => { session.current() }
    const timeout = setTimeout(check, Math.min(Math.max(state.claims.exp * 1000 - Date.now(), 0), 2_147_483_647))
    window.addEventListener('advertio:app-state', check)
    document.addEventListener('visibilitychange', check)
    return () => { clearTimeout(timeout); window.removeEventListener('advertio:app-state', check); document.removeEventListener('visibilitychange', check) }
  }, [state.claims])
  const retry = useCallback(() => { void session.restore(validate) }, [])
  return { status: state.status, claims: state.claims, canTransact: state.status === 'authenticated' && state.claims?.phoneVerified === true, error: state.error, retry }
}
