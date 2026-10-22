export function detectChannel(native: boolean, telegramProbe?: () => boolean): 'android' | 'telegram' | 'browser'
export function secureExternalUrl(value: string, telegramOnly?: boolean): string
export interface Services {
  keyboardVisible?(): boolean
  confirmExit?(): Promise<boolean>
  historyIndex(): number | undefined
  historyBack(): void
  minimize(): Promise<void>
  listen(name: string, fn: (event: any) => void): Promise<{remove(): Promise<void>}>
  onActive(active: boolean): void
  statusBar(): Promise<void>
  open(url: string): Promise<void>
  haptic(kind: string): Promise<void>
  hideKeyboard(): Promise<void>
}
export function createController(services: Services): {
  start(): Promise<void>; stop(): Promise<void>
  registerBack(fn: () => void): () => void
  openExternal(value: string, telegramOnly?: boolean): Promise<void>
  haptic(kind: string): Promise<void>; hideKeyboard(): Promise<void>; close(): Promise<void>
}
