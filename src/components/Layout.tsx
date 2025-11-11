import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import ThemeToggle from './ThemeToggle'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur transition dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="text-xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400">
            AnimeSearch
          </Link>
          <nav className="flex flex-wrap items-center gap-10 text-sm font-semibold text-slate-500 dark:text-slate-300">
            <a
              href="https://docs.api.jikan.moe/#tag/anime"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-slate-900 dark:hover:text-white"
            >
              Jikan Docs
            </a>
            <a
              href="https://porto-ku.excitech.id/user?id=nur.wahid.azhar"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-slate-900 dark:hover:text-white"
            >
              Developer
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500 transition dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
        Built with React, Redux, and React Query.
      </footer>
    </div>
  )
}

export default Layout
