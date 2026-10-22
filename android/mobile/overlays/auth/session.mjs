/** Session policy only. JWT decoding is for presentation; the API authorizes requests. */
export function readClaims(token, now = Date.now()) {
  try {
    if (typeof token !== 'string' || token.length > 65536) return null
    const parts = token.split('.')
    if (parts.length !== 3 || parts.some((part) => !/^[A-Za-z0-9_-]+$/.test(part))) return null
    const decode = (s) => JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(s.length / 4) * 4, '=')), (c) => c.charCodeAt(0))))
    const header = decode(parts[0]), raw = decode(parts[1])
    if (!header.alg || String(header.alg).toLowerCase() === 'none' || typeof raw.sub !== 'string' || !raw.sub.trim() || !Number.isFinite(raw.exp) || raw.exp * 1000 <= now) return null
    const truth = (v) => v === true || (typeof v === 'string' && v.toLowerCase() === 'true')
    return { sub: raw.sub, provider: typeof raw.provider === 'string' ? raw.provider : '', phoneVerified: truth(raw.phone_verified), isAdmin: truth(raw.is_admin), exp: raw.exp }
  } catch { return null }
}

export function createSession({ vault, notify, clearPrivateData, onLogout = () => {}, now = Date.now }) {
  let generation = 0, token = null, tail = Promise.resolve(), restoreFlight = null
  const empty = (status = 'needs-login', error = null) => ({ token: null, claims: null, status, error })
  const emit = (state) => { token = state.token; notify(state) }
  const enqueue = (fn) => { const next = tail.then(fn); tail = next.catch(() => {}); return next }
  const clearData = () => { try { void Promise.resolve(clearPrivateData()).catch(() => {}) } catch {} }
  async function accept(value, expectedSubject) {
    const epoch = ++generation
    const claims = readClaims(value, now())
    clearData()
    emit(empty('authenticating'))
    if (!claims || (expectedSubject && claims.sub !== expectedSubject)) {
      await enqueue(() => vault.clear())
      if (epoch === generation) emit(empty('failed', 'INVALID_SESSION'))
      throw new Error('INVALID_SESSION')
    }
    try {
      await enqueue(async () => {
        try { await vault.write(value) }
        catch { await vault.clear().catch(() => {}); throw new Error('SESSION_STORAGE_UNAVAILABLE') }
      })
      if (epoch !== generation) return false
      if (!readClaims(value, now())) { await logout(); return false }
      emit({ token: value, claims, status: 'authenticated', error: null })
      return true
    } catch {
      // A failed durable write must not leave the previous account on disk.
      if (epoch === generation) emit(empty('failed', 'SESSION_STORAGE_UNAVAILABLE'))
      throw new Error('SESSION_STORAGE_UNAVAILABLE')
    }
  }
  function logout() {
    const epoch = ++generation
    emit(empty())
    try { onLogout() } catch {}
    clearData()
    return enqueue(() => vault.clear()).catch(() => { if (epoch === generation) emit(empty('failed', 'SESSION_STORAGE_UNAVAILABLE')) })
  }
  function restore(validate) {
    if (restoreFlight) return restoreFlight
    const epoch = generation
    restoreFlight = (async () => {
      emit(empty('authenticating'))
      try {
        const value = await enqueue(() => vault.read())
        if (epoch !== generation) return
        if (!value) { emit(empty()); return }
        const claims = readClaims(value, now())
        if (!claims) { await logout(); return }
        const subject = await validate(value)
        if (epoch !== generation) return
        if (subject !== claims.sub) { await logout(); return }
        // Restore never overwrites a newer login/logout and never trusts local claims alone.
        emit({ token: value, claims, status: 'authenticated', error: null })
      } catch (error) {
        if (epoch !== generation) return
        if (error?.code === 'UNAUTHORIZED') await logout()
        else emit(empty('failed', 'SESSION_RESTORE_UNAVAILABLE'))
      }
    })().finally(() => { restoreFlight = null })
    return restoreFlight
  }
  return {
    accept, logout, restore,
    current() { if (token && !readClaims(token, now())) { void logout(); return null }; return token },
    epoch: () => generation,
    settled: () => tail,
  }
}
