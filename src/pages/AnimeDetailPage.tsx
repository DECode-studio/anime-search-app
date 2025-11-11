import { useAnimeDetailPage } from '../hooks/pages/useAnimeDetailPage'

const AnimeDetailPage = () => {
  const { data, isPending, isError, errorMessage, handleBack, heroRef, detailRef } = useAnimeDetailPage()
  const anime = data?.data

  return (
    <section className="space-y-8">
      <div ref={heroRef} className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300"
        >
          ← Back
        </button>
      </div>

      {isPending && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="h-96 w-full animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-700 lg:w-1/3" />
            <div className="flex-1 space-y-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-6 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              ))}
            </div>
          </div>
        </div>
      )}

      {isError && (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200">
          {errorMessage ?? 'Unable to load anime details.'}
        </div>
      )}

      {anime && (
        <div
          ref={detailRef}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex w-full flex-col gap-4 lg:w-1/3">
              <img
                src={
                  anime.images.webp?.large_image_url ||
                  anime.images.webp?.image_url ||
                  anime.images.jpg.large_image_url ||
                  anime.images.jpg.image_url
                }
                alt={anime.title}
                className="w-full rounded-2xl object-cover shadow-lg"
              />
              {anime.trailer?.url && (
                <a
                  href={anime.trailer.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-indigo-500 px-4 py-2 text-center font-semibold text-indigo-600 transition hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-200 dark:hover:bg-indigo-500/10"
                >
                  Watch Trailer
                </a>
              )}
            </div>
            <div className="flex-1 space-y-6">
              <div data-detail-section>
                <p className="text-sm uppercase tracking-[0.3em] text-indigo-500">{anime.type}</p>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white">{anime.title}</h1>
                {anime.title_english && <p className="text-lg text-slate-500 dark:text-slate-300">{anime.title_english}</p>}
              </div>
              <div data-detail-section className="flex flex-wrap gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                {anime.score && <span className="rounded-full bg-amber-100 px-4 py-1">⭐ {anime.score.toFixed(1)}</span>}
                {anime.episodes && <span className="rounded-full bg-slate-100 px-4 py-1">{anime.episodes} episodes</span>}
                {anime.year && <span className="rounded-full bg-slate-100 px-4 py-1">{anime.year}</span>}
                {anime.rating && <span className="rounded-full bg-slate-100 px-4 py-1">{anime.rating}</span>}
                {anime.status && <span className="rounded-full bg-slate-100 px-4 py-1">{anime.status}</span>}
              </div>
              {anime.synopsis && (
                <div data-detail-section>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Synopsis</h2>
                  <p className="text-slate-600 dark:text-slate-300">{anime.synopsis}</p>
                </div>
              )}
              {anime.genres && anime.genres.length > 0 && (
                <div data-detail-section>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Genres</h2>
                  <div className="mt-2 flex flex-wrap gap-2 text-slate-600 dark:text-slate-200">
                    {anime.genres.map((genre) => (
                      <span key={genre.mal_id} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <dl data-detail-section className="grid gap-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800/70 dark:text-slate-200 sm:grid-cols-2">
                {anime.duration && (
                  <div>
                    <dt className="font-semibold text-slate-900 dark:text-white">Duration</dt>
                    <dd>{anime.duration}</dd>
                  </div>
                )}
                {anime.broadcast?.string && (
                  <div>
                    <dt className="font-semibold text-slate-900 dark:text-white">Broadcast</dt>
                    <dd>{anime.broadcast.string}</dd>
                  </div>
                )}
                {anime.studios && anime.studios.length > 0 && (
                  <div className="sm:col-span-2">
                    <dt className="font-semibold text-slate-900 dark:text-white">Studios</dt>
                    <dd>{anime.studios.map((studio) => studio.name).join(', ')}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default AnimeDetailPage
