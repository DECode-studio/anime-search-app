import type { ChangeEvent } from 'react'
import { useId } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const SearchBar = ({ value, onChange, placeholder = 'Search anime...' }: SearchBarProps) => {
  const inputId = useId()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <div className="w-full">
      <label htmlFor={inputId} className="sr-only">
        Anime search query
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400 dark:text-slate-500">
          🔍
        </span>
        <input
          id={inputId}
          type="search"
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-base text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-indigo-300 dark:focus:ring-indigo-500/30"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            className="absolute inset-y-0 right-2 flex items-center px-2 text-sm text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
            onClick={() => onChange('')}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
