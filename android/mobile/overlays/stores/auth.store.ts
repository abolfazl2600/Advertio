import { create } from 'zustand'
import { vault } from '@/shared/auth/vault'
import { createSession, type TokenClaims, type SessionState, type SessionStatus } from '@/shared/auth/session.mjs'
export type { TokenClaims, SessionStatus } from '@/shared/auth/session.mjs'

let clearPrivateData: () => unknown = () => {}
export function bindSessionCleanup(fn: () => unknown): () => void {
  clearPrivateData = fn
  return () => { if (clearPrivateData === fn) clearPrivateData = () => {} }
}
interface AuthState extends SessionState {
  setToken(token: string): void
  setStatus(status: SessionStatus, error?: string | null): void
  logout(): void
}
export const useAuthStore = create<AuthState>((set) => ({
  token: null, claims: null, status: 'idle', error: null,
  setToken: (token) => { void session.accept(token).catch(() => {}) },
  setStatus: (status, error = null) => set({ status, error }),
  logout: () => { void session.logout() },
}))
export const session = createSession({ vault, notify: (state) => useAuthStore.setState(state), clearPrivateData: () => clearPrivateData(), onLogout: () => window.dispatchEvent(new Event('advertio:signed-out')) })
export const acceptSession = (token: string, expectedSubject?: string) => session.accept(token, expectedSubject)
export function isExpired(claims: TokenClaims): boolean { return claims.exp * 1000 <= Date.now() }
