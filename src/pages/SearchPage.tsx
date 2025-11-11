import type { Anime } from '../api/types/anime'
import AnimeCard from '../components/AnimeCard'
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'
import { useSearchPage } from '../hooks/pages/useSearchPage'

const SearchPage = () => {
  const {
    query,
    debouncedQuery,
    isReadyToSearch,
    isPending,
    isError,
    errorMessage,
    data,
    page,
    handleQueryChange,
    handlePageChange,
    heroRef,
    resultsRef,
  } = useSearchPage()

  const renderContent = () => {
    if (!isReadyToSearch) {
      return (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-100">Start typing to discover your next anime binge.</p>
        </div>
      )
    }

    if (isPending) {
      return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 h-48 rounded-xl bg-slate-200 dark:bg-slate-700" />
              <div className="mb-2 h-4 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="mb-2 h-4 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
        </div>
      )
    }

    if (isError) {
      return (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200">
          <p className="font-semibold">Something went wrong.</p>
          <p className="text-sm">{errorMessage ?? 'Unable to fetch anime data.'}</p>
        </div>
      )
    }

    if (!data || data.data.length === 0) {
      return (
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            No anime found for &ldquo;{debouncedQuery}&rdquo;
          </p>
          <p className="text-sm">Try another title or check your spelling.</p>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Showing {data.pagination.items.count} of {data.pagination.items.total.toLocaleString()} results
        </div>
        <div ref={resultsRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.data.map((anime: Anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
        <Pagination
          currentPage={page}
          totalPages={data.pagination.last_visible_page}
          hasNextPage={data.pagination.has_next_page}
          onPageChange={handlePageChange}
        />
      </div>
    )
  }

  return (
    <section className="space-y-8">
      <div ref={heroRef} className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-500">Anime Explorer</p>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Find your next favorite anime
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Instant search powered by the public Jikan API. No need to press enter!
        </p>
      </div>
      <SearchBar value={query} onChange={handleQueryChange} />
      {renderContent()}
    </section>
  )
}

export default SearchPage
