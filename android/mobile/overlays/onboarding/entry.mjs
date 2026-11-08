// Presentation preference only. Authentication remains in the secure session vault.
// v2 makes the three-slide introduction visible once after updating from the old welcome screen.
export const WELCOME_KEY = 'advertio.android.welcome.v2'
export function hasSeenWelcome(storage) {
  try { return storage?.getItem(WELCOME_KEY) === 'seen' } catch { return false }
}
export function completeWelcome(storage) {
  try { storage?.setItem(WELCOME_KEY, 'seen') } catch { /* Guest browsing still works without storage. */ }
}
