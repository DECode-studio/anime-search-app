# Anime Search App Prompt Library

Use these prompts to guide an AI assistant when bootstrapping or iterating on this project from scratch. Each block is self-contained so you can copy/paste it into a chat and receive focused help without overwhelming context. Follow the order for best results, or jump to the prompt that matches the task you need.

---

## Prompt 1 – Kickstarting the Project
```
You're acting as a senior React + TypeScript engineer. I'm building a Vite SPA (no Next.js) called "Anime Search App". Please:
1. Scaffold a React 19 + TypeScript + Vite project (npm only).
2. Configure Vite dev server to run on port 4000 by default.
3. Install dependencies: react-router-dom, @reduxjs/toolkit, react-redux, @tanstack/react-query, axios, tailwindcss (v4 via @tailwindcss/vite), and gsap.
4. Provide the exact npm commands in the order they should be executed.
5. Explain any config files that need to be touched.
```

## Prompt 2 – Base Architecture & Styling
```
We now have a blank Vite + React + TS app with Tailwind v4. Help me:
1. Set up folders: src/api, src/api/types, src/app (store/hooks), src/components, src/features/search, src/hooks (common/api/pages), src/pages, src/context.
2. Configure Tailwind with class-based dark mode and ensure dark variants compile (tailwind.config.ts + style import).
3. Create a Redux store with a search slice (query, page, pageSize) and typed hooks.
4. Add a ThemeProvider with localStorage persistence and a ThemeToggle component.
5. Show necessary code snippets for each file and mention where to import them.
```

## Prompt 3 – Typed Jikan API Layer
```
I need fully typed API models for the Jikan Anime endpoints and fetch helpers:
1. Reference https://docs.api.jikan.moe/#tag/anime.
2. Create TypeScript interfaces for anime search + detail responses (images, titles, genres, pagination, etc.).
3. Build an `animeApi.ts` with functions for search and detail, supporting AbortSignal cancellation and optional ordering params.
4. Provide reusable React Query hooks (`useAnimeSearchQuery`, `useAnimeDetailQuery`) that accept parameters and expose loading/error data.
5. Include any supporting utility code (URL builders, params typing).
```

## Prompt 4 – Page-Level Hooks with GSAP Enhancements
```
Let's craft page hooks so components stay minimal:
1. Build `useSearchPage` that composes Redux, debounce (250 ms), React Query hook, GSAP hero/Results animations, and exposes refs + handlers.
2. Build `useAnimeDetailPage` that handles route params, React Query detail fetching, GSAP hero/detail reveal, and a back handler.
3. Ensure both hooks return only the data/handlers/components need (query, debouncedQuery, isPending, errorMessage, data, refs, etc.).
4. Document how to integrate these hooks inside `SearchPage.tsx` and `AnimeDetailPage.tsx`.
```

## Prompt 5 – UI Components & Pages
```
Create the UI for both pages using Tailwind + GSAP hooks:
1. SearchPage: hero text, SearchBar, skeleton loaders, empty/error states, grid of AnimeCard components, Pagination, all respecting light/dark classes.
2. AnimeDetailPage: back button, responsive layout with cover/trailer CTA, badges, synopsis, genres, metadata grid.
3. Shared components: SearchBar, AnimeCard (with data attributes for GSAP), Pagination, Layout (header/footer), ThemeToggle.
4. Make sure styles look good in both themes and mention how GSAP refs are connected.
```

## Prompt 6 – Wiring Providers & Entry Point
```
Help me finalize src/main.tsx and App shell:
1. Wrap the app with ThemeProvider, Redux Provider, and React Query’s QueryClientProvider (with sensible defaultOptions).
2. Configure BrowserRouter with routes for "/" (search) and "/anime/:id" (detail), using a Layout shell.
3. Confirm global styles import (`src/assets/style.css`) and describe any necessary body/HTML class manipulation for theming.
4. Provide the final `vite.config.ts` snippet showing React plugin, Tailwind plugin, and port 4000 server setting.
```

## Prompt 7 – Testing & Validation
```
Now that everything is wired:
1. Provide commands and expectations for `npm run build` and `npm run dev`.
2. Suggest manual sanity checks (search latency, pagination, detail navigation, theme toggle, GSAP animations).
3. Mention any lightweight test ideas (slice reducers, hook behavior) if I want to extend coverage later.
```

## Prompt 8 – Deployment & Docs
```
I need polished documentation and deployment guidance:
1. Draft a README detailing features, tech stack, setup instructions, project structure, bonus features, and deployment advice.
2. List a submission checklist (npm only, port 4000, no env vars, live URL, etc.).
3. Provide tips for deploying to Netlify/Vercel and remind to add the live URL back into the README.
```

---

### Usage Tips
- When pasting a prompt, mention any files already created so the AI can diff/append instead of overwriting.
- After each major response, ask the AI to summarize pending work or risks before moving to the next prompt.
- Keep `PROMPTS.md` up to date as the project evolves so future sessions stay consistent.
