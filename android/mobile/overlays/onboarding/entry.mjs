// Presentation preference only. Authentication remains in the secure session vault.
export const WELCOME_KEY = 'advertio.android.welcome.v1'
export function hasSeenWelcome(storage) {
  try { return storage?.getItem(WELCOME_KEY) === 'seen' } catch { return false }
}
export function completeWelcome(storage) {
  try { storage?.setItem(WELCOME_KEY, 'seen') } catch { /* Browsing also works without storage. */ }
}
