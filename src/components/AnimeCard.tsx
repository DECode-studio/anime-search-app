import { Link } from 'react-router-dom'

import type { Anime } from '../api/types/anime'

interface AnimeCardProps {
  anime: Anime
}

const truncateText = (value?: string | null, maxLength = 160) => {
  if (!value) return 'No synopsis available.'
  if (value.length <= maxLength) return value
  return `${value.slice(0, maxLength).trimEnd()}…`
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
  const cover =
    anime.images.webp?.large_image_url ||
    anime.images.webp?.image_url ||
    anime.images.jpg.large_image_url ||
    anime.images.jpg.image_url

  return (
    <article
      data-anime-card
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-900/20"
    >
      <Link to={`/anime/${anime.mal_id}`} className="flex h-full flex-col">
        <div className="relative h-64 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          {cover ? (
            <img
              src={cover}
              alt={anime.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-400 dark:text-slate-500">No image</div>
          )}
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-950/80 dark:text-slate-100">
            {anime.type ?? 'Unknown'}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{anime.title}</h3>
            {anime.title_english && <p className="text-sm text-slate-500 dark:text-slate-400">{anime.title_english}</p>}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">{truncateText(anime.synopsis)}</p>
          <div className="mt-auto flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            {anime.score && (
              <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-700 dark:bg-amber-200/40 dark:text-amber-200">
                ⭐ {anime.score.toFixed(1)}
              </span>
            )}
            {anime.episodes && <span>{anime.episodes} eps</span>}
            {anime.year && <span>{anime.year}</span>}
          </div>
        </div>
      </Link>
    </article>
  )
}

export default AnimeCard
