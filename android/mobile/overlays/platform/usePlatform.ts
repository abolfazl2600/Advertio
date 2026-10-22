import { isAndroid, native } from './native-runtime'

// Installed ONLY into the temporary Android checkout. Web/Telegram builds retain originals.
export function initPlatform(): void {
  if (!isAndroid()) throw new Error('Android overlay requires native Android')
  void native.start().catch(() => {
    // Fixed error code only; never log plugin error objects, URLs or credentials.
    console.error('ANDROID_PLATFORM_INIT_FAILED')
  })
}
export function detectStartParam(): null { return null }
export function usePlatform() {
  return {
    isEmbedded: false, user: null, startParam: null, credential: null,
    providerKey: 'phone',
    requestPhoneCredential: async (): Promise<null> => null,
    openInvoice: async (): Promise<'unsupported'> => 'unsupported',
    openTelegramLink: (url: string): void => { void native.openExternal(url, true).catch(() => undefined) },
    close: (): void => { void native.close() },
    haptic: {
      light: () => { void native.haptic('light') },
      medium: () => { void native.haptic('medium') },
      success: () => { void native.haptic('success') },
      error: () => { void native.haptic('error') },
      warning: () => { void native.haptic('warning') },
    },
  }
}
