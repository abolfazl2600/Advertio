export interface TokenClaims { sub: string; provider: string; phoneVerified: boolean; isAdmin: boolean; exp: number }
export type SessionStatus = 'idle' | 'authenticating' | 'authenticated' | 'needs-login' | 'unsupported' | 'failed'
export interface SessionState { token: string | null; claims: TokenClaims | null; status: SessionStatus; error: string | null }
export function readClaims(token: unknown, now?: number): TokenClaims | null
export function createSession(options: { vault: {read(): Promise<string | null>; write(token: string): Promise<void>; clear(): Promise<void>}; notify(state: SessionState): void; clearPrivateData(): unknown; onLogout?(): void; now?: () => number }): {
  accept(token: string, expectedSubject?: string): Promise<boolean>; logout(): Promise<void>
  restore(validate: (token: string) => Promise<string>): Promise<void>; current(): string | null
  epoch(): number; settled(): Promise<unknown>
}
