import { consumeAuthLink } from '../payments/policy.mjs'
/** Original channel policy and native navigation controller. No SDK/global access at import. */
export function detectChannel(native, telegramProbe = () => false) {
  if (native) return 'android'
  try { return telegramProbe() ? 'telegram' : 'browser' } catch { return 'browser' }
}

export function secureExternalUrl(value, telegramOnly = false) {
  const url = new URL(value)
  if (url.protocol !== 'https:' || url.username || url.password)
    throw new Error('External URL requires HTTPS without credentials')
  if (telegramOnly && !['t.me', 'telegram.me'].includes(url.hostname))
    throw new Error('Telegram host required')
  return consumeAuthLink(url.href)
}

export function createController(services) {
  const handlers = []
  let stopped = false
  let handles = []
  let starting
  let navigating = false
  const safe = (fn) => Promise.resolve().then(fn).catch(() => undefined)
  async function back(event) {
    if (navigating || stopped) return
    navigating = true
    try {
      if (services.keyboardVisible?.()) { await services.hideKeyboard(); return }
      const custom = handlers.at(-1)
      if (custom) await custom()
      else if (services.historyIndex() > 0) services.historyBack()
      else if (event.canGoBack && services.historyIndex() === undefined) services.historyBack()
      else if (!services.confirmExit || await services.confirmExit()) await services.minimize()
    } finally { navigating = false }
  }
  return {
    start() {
      starting ??= (async () => {
        try {
          for (const [name, fn] of [
            ['backButton', (e) => { void safe(() => back(e)) }],
            ['appStateChange', (e) => { services.onActive(e.isActive) }],
          ]) {
            const handle = await services.listen(name, fn)
            if (stopped) await handle.remove()
            else handles.push(handle)
          }
          await safe(() => services.statusBar())
        } catch {
          await this.stop()
          throw new Error('Native navigation could not initialize')
        }
      })()
      return starting
    },
    async stop() {
      stopped = true
      const current = handles
      handles = []
      await Promise.all(current.map((h) => safe(() => h.remove())))
    },
    registerBack(fn) {
      handlers.push(fn)
      return () => { const i = handlers.indexOf(fn); if (i >= 0) handlers.splice(i, 1) }
    },
    openExternal(value, telegramOnly = false) {
      return services.open(secureExternalUrl(value, telegramOnly))
    },
    haptic(kind) { return safe(() => services.haptic(kind)) },
    hideKeyboard() { return safe(() => services.hideKeyboard()) },
    close() { return safe(() => services.minimize()) },
  }
}
