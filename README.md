# Anime Search App

Instant-search React application for exploring anime via the free [Jikan](https://docs.api.jikan.moe/#tag/anime) API. Users can look up titles with server-side pagination and open a dedicated detail view for richer metadata.

## Features

- ⚡️ Debounced (250 ms) instant search with in-flight request cancellation via React Query
- 📄 Server-side pagination that mirrors Jikan paging metadata
- 🧠 Redux Toolkit to persist search parameters across routes
- 🔍 Fully typed API models for search and detail endpoints (`src/api/types/anime.ts`)
- 🧭 React Router detail page with scores, genres, studios, trailers, and metadata callouts
- 🎨 Responsive Tailwind UI with skeleton loaders, empty states, and friendly error messaging
- 🌗 Persistent light/dark mode toggle backed by a custom ThemeProvider
- 🌀 Delightful page/card animations powered by GSAP

## Tech Stack

- React 19 + TypeScript + Vite
- Redux Toolkit + React Redux
- @tanstack/react-query for data fetching/caching
- react-router-dom for routing
- Tailwind CSS v4 (via `@tailwindcss/vite`)

## Getting Started

```bash
npm install
npm run dev -- --port 4000
```

The Vite dev server default is already set to port **4000** in `vite.config.ts`, so `npm run dev` alone will satisfy the port requirement.

## Project Structure

```
src/
  api/
    animeApi.ts          # REST helpers for Jikan with abort-aware fetch
    types/anime.ts       # Typed models for search + detail responses
  app/
    store.ts             # Redux store configuration
    hooks.ts             # Typed hooks for useDispatch/useSelector
  assets/
    style.css            # Tailwind + global theming rules
  components/
    AnimeCard.tsx, Pagination.tsx, SearchBar.tsx, Layout.tsx, ThemeToggle.tsx, etc.
  context/
    ThemeContext.tsx     # Light/dark provider with localStorage persistence
  features/
    search/
      searchSlice.ts     # Redux slice for query/page/pageSize
  hooks/
    api/                 # React Query hooks (useAnimeSearchQuery, useAnimeDetailQuery)
    common/              # Shared hooks (useDebouncedValue, useTheme)
    pages/               # Page orchestrators (useSearchPage, useAnimeDetailPage)
  pages/
    SearchPage.tsx, AnimeDetailPage.tsx
  App.tsx                # Router + layout shell
  main.tsx               # Entry with Theme/Redux/React Query providers
```

## Bonus Implementation

- Skeleton loaders during fetches
- Friendly empty/search onboarding states
- External link to the official Jikan documentation from the header
- GSAP-driven hero/card/detail animations
- Theme toggle with local preference storage

## Deployment

Deploy to any static hosting provider (Netlify, Vercel, Render, etc.) by building with `npm run build` and serving the `dist` output. Update this README with the live URL when ready for review.
