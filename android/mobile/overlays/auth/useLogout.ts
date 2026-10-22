import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import { capturedTokenRequest } from '@/shared/api/native-adapter'
import { API } from '@/shared/api/endpoints'
import { session } from '@/shared/stores/auth.store'

export function useLogout(): () => void {
  const client = useQueryClient()
  return useCallback(() => {
    const token = session.current()
    // Capture the revocation header before clearing memory; the shared interceptor cannot replace it.
    if (token) void capturedTokenRequest(apiClient.defaults.baseURL!, API.auth.logout, token, 'POST').catch(() => {})
    void session.logout()
    void client.cancelQueries()
    client.clear()
  }, [client])
}
