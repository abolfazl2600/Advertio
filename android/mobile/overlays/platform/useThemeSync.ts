import { useEffect } from 'react'
import { useTheme, useThemeStore } from '@/shared/stores/theme.store'
export type { ThemeName } from '@/shared/stores/theme.store'

export function useThemeSync(): void {
  const theme = useTheme()
  const setPlatform = useThemeStore((state) => state.setPlatform)
  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])
  useEffect(() => {
    const query = matchMedia('(prefers-color-scheme: light)')
    const update = () => setPlatform(query.matches ? 'light' : 'dark')
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [setPlatform])
}
