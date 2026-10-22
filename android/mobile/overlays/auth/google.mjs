/** The API, not a decoded Google token, owns the Advertio account and verified-phone state. */
export function createGoogleLogin({ native, exchange, accept, epoch }) {
  let busy = false
  return {
    async signIn() {
      if (busy) throw new Error('GOOGLE_REQUEST_IN_PROGRESS')
      busy = true
      const current = epoch()
      try {
        const result = await native.signIn()
        if (current !== epoch()) throw new Error('GOOGLE_CANCELLED')
        if (typeof result.idToken !== 'string' || !result.idToken || result.idToken.length > 65536) throw new Error('GOOGLE_CREDENTIAL_REJECTED')
        const response = await exchange(result.idToken)
        if (current !== epoch()) throw new Error('GOOGLE_CANCELLED')
        if (!response.token || !response.userId) throw new Error('GOOGLE_API_RESPONSE_REJECTED')
        return await accept(response.token, response.userId)
      } finally { busy = false }
    },
    async clear() { await native.clear() },
  }
}
