import type { ReactNode } from 'react'
import { createContext, useEffect, useLayoutEffect, useMemo, useState } from 'react'

type ThemeMode = 'light' | 'dark'

interface ThemeContextValue {
  theme: ThemeMode
  toggleTheme: () => void
  setTheme: (next: ThemeMode) => void
}

const STORAGE_KEY = 'anime-search-theme'

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const getSystemPreference = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null
  return stored ?? getSystemPreference()
}

const applyThemeClass = (mode: ThemeMode) => {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.toggle('dark', mode === 'dark')
  root.classList.toggle('light', mode === 'light')
  root.dataset.theme = mode
  document.body?.classList.toggle('dark', mode === 'dark')
  document.body?.classList.toggle('light', mode === 'light')
  document.body?.setAttribute('data-theme', mode)
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme)

  useLayoutEffect(() => {
    applyThemeClass(theme)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, theme)
    }
  }, [theme])

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const handler = (event: MediaQueryListEvent) => {
      setThemeState(event.matches ? 'dark' : 'light')
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark')),
      setTheme: (next: ThemeMode) => setThemeState(next),
    }),
    [theme],
  )

  return (
    <ThemeContext.Provider value={value}>
      <div className={theme === 'dark' ? 'dark' : 'light'} data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
