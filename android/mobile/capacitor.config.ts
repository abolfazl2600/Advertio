import type { CapacitorConfig } from '@capacitor/cli'

// Provisional DEVELOPMENT identity; final Play package requires owner approval.
const config: CapacitorConfig = {
  appId: 'com.advertio.development',
  appName: 'Advertio Development',
  webDir: 'www',
  server: { hostname: 'localhost', androidScheme: 'https', cleartext: false },
  android: { allowMixedContent: false, webContentsDebuggingEnabled: false },
  plugins: { CapacitorHttp: { enabled: false } },
}
export default config
