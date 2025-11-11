import { useQuery } from '@tanstack/react-query'

import { fetchAnimeDetails } from '../../api/animeApi'
import type { AnimeDetailResponse } from '../../api/types/anime'

export const useAnimeDetailQuery = (id?: string) => {
  return useQuery<AnimeDetailResponse, Error>({
    queryKey: ['anime-detail', id],
    queryFn: ({ signal }) => {
      if (!id) {
        throw new Error('Anime id is missing')
      }
      return fetchAnimeDetails(id, signal)
    },
    enabled: Boolean(id),
  })
}
