import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import { apiUrl } from '@/shared/api/policy.mjs'
import { API } from '@/shared/api/endpoints'
import { session } from '@/shared/stores/auth.store'

export function useLogout(): () => void {
  const client = useQueryClient()
  return useCallback(() => {
    const token = session.current()
    // Capture the revocation header before clearing memory; the shared interceptor cannot replace it.
    if (token) void fetch(apiUrl(API.auth.logout, apiClient.defaults.baseURL!), {
      method: 'POST', headers: {Authorization: `Bearer ${token}`}, redirect: 'error', signal: AbortSignal.timeout(10_000),
    }).catch(() => {})
    void session.logout()
    void client.cancelQueries()
    client.clear()
  }, [client])
}
