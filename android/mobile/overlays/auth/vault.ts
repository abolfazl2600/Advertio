import { Capacitor, registerPlugin } from '@capacitor/core'
const plugin = registerPlugin<{
  read(): Promise<{token: string | null}>; write(input: {token: string}): Promise<void>; clear(): Promise<void>
}>('SecureSession')
function requireNative() {
  if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'android') throw new Error('NATIVE_VAULT_REQUIRED')
}
export const vault = {
  async read() { requireNative(); return (await plugin.read()).token },
  async write(token: string) { requireNative(); await plugin.write({token}) },
  async clear() { requireNative(); await plugin.clear() },
}
