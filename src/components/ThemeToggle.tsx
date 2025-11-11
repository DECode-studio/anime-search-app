import { useTheme } from '../hooks/common/useTheme'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600"
    >
      <span className="text-lg">{isDark ? '🌙' : '☀️'}</span>
      <span>{isDark ? 'Dark' : 'Light'} mode</span>
    </button>
  )
}

export default ThemeToggle
