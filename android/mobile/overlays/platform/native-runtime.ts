import { Capacitor } from '@capacitor/core'
import { App } from '@capacitor/app'
import { Browser } from '@capacitor/browser'
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics'
import { Keyboard } from '@capacitor/keyboard'
import { installNativeUX, keyboardVisible, confirmExit } from './native-ux'
import { createController } from './controller.mjs'

export const isAndroid = () => Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android'
export const native = createController({
  keyboardVisible, confirmExit,
  historyIndex: () => window.history.state?.idx,
  historyBack: () => window.history.back(),
  minimize: () => App.minimizeApp(),
  listen: (name, fn) => name === 'backButton'
    ? App.addListener('backButton', fn) : App.addListener('appStateChange', fn),
  onActive: (active) => {
    document.documentElement.dataset.appActive = String(active)
    window.dispatchEvent(new CustomEvent('advertio:app-state', { detail: { active } }))
  },
  statusBar: () => installNativeUX(),
  open: (url) => Browser.open({ url }),
  hideKeyboard: () => Keyboard.hide(),
  haptic: (kind) => {
    const notifications: Record<string, NotificationType> = {
      success: NotificationType.Success, error: NotificationType.Error, warning: NotificationType.Warning,
    }
    if (notifications[kind]) return Haptics.notification({ type: notifications[kind] })
    return Haptics.impact({ style: kind === 'heavy' ? ImpactStyle.Heavy : kind === 'medium' ? ImpactStyle.Medium : ImpactStyle.Light })
  },
})
