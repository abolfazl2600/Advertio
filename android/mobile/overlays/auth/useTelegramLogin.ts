import { authorizeAuthLink } from '@/shared/payments/policy.mjs'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import { API } from '@/shared/api/endpoints'
import { acceptSession, session as authSession } from '@/shared/stores/auth.store'
import { native } from '@/shared/platform/native-runtime'

interface BotSession { ticket: string; verificationCode: string; deepLink: string; expiresInSeconds: number }
type Status = 'pending' | 'opened' | 'ready' | 'expired'
export function useTelegramLogin() {
  const client = useQueryClient()
  const [session, setSession] = useState<BotSession | null>(null)
  const [status, setStatus] = useState<Status>('pending')
  const generation = useRef(0)
  const authEpoch = useRef(0)
  const start = useMutation({
    mutationFn: async () => {
      const operation = ++generation.current, epoch = authSession.epoch()
      const {data} = await apiClient.post<BotSession>(API.auth.telegramLinkStart, {})
      if (operation !== generation.current || epoch !== authSession.epoch()) throw new Error('LOGIN_CANCELLED')
      if (!data.ticket || !data.verificationCode || !Number.isFinite(data.expiresInSeconds) || data.expiresInSeconds <= 0) throw new Error('INVALID_CHALLENGE')
      // Native browser handoff carries only the server's bot ticket, never our JWT.
      await native.openExternal(authorizeAuthLink(data.deepLink), true)
      if (operation !== generation.current || epoch !== authSession.epoch()) throw new Error('LOGIN_CANCELLED')
      authEpoch.current = epoch
      return data
    },
    onSuccess: (data) => { setStatus('pending'); setSession(data) },
  })
  useEffect(() => {
    if (!session) return
    const epoch = authEpoch.current, operation = generation.current
    const deadline = Date.now() + session.expiresInSeconds * 1000
    let closed = false, running = false, paused = document.visibilityState === 'hidden' || document.documentElement.dataset.appActive === 'false', done = false
    let timer: ReturnType<typeof setTimeout> | undefined
    const abort = new AbortController()
    const valid = () => !closed && !done && operation === generation.current && epoch === authSession.epoch()
    const poll = async () => {
      if (!valid() || running || paused) return
      if (Date.now() >= deadline) { done = true; setStatus('expired'); return }
      running = true
      try {
        const {data} = await apiClient.get<{status: Status; auth: {token: string; userId: string} | null}>(API.auth.telegramLinkStatus(session.ticket), {signal: abort.signal})
        if (!valid()) return
        if (data.status === 'ready' && data.auth) {
          done = true
          await acceptSession(data.auth.token, data.auth.userId)
          if (!closed) { setStatus('ready'); void client.invalidateQueries() }
        } else if (data.status === 'expired') { done = true; setStatus('expired') }
        else setStatus(data.status === 'opened' ? 'opened' : 'pending')
      } catch { /* No credentials, ticket or response objects logged. Bounded retry until expiry. */ }
      finally {
        running = false
        if (valid() && !paused) timer = setTimeout(() => { void poll() }, 2000)
      }
    }
    const stateChange = (event: Event) => {
      paused = (event as CustomEvent<{active: boolean}>).detail?.active === false
      if (timer) clearTimeout(timer)
      if (!paused) void poll()
    }
    // Delay the first request: React StrictMode's mount/cleanup probe cannot consume a one-shot ticket twice.
    timer = setTimeout(() => { void poll() }, 2000)
    window.addEventListener('advertio:app-state', stateChange)
    return () => { closed = true; abort.abort(); if (timer) clearTimeout(timer); window.removeEventListener('advertio:app-state', stateChange) }
  }, [session, client])
  const reset = useCallback(() => { ++generation.current; setSession(null); setStatus('pending'); start.reset() }, [start])
  return {start, session, status, isWaitingInTelegram: session !== null && (status === 'pending' || status === 'opened'), reset}
}
