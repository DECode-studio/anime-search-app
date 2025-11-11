import { useQuery } from '@tanstack/react-query'

import { fetchAnimeSearch } from '../../api/animeApi'
import type { AnimeSearchResponse } from '../../api/types/anime'

interface UseAnimeSearchQueryParams {
  query: string
  page: number
  limit: number
  enabled?: boolean
}

export const useAnimeSearchQuery = ({ query, page, limit, enabled = true }: UseAnimeSearchQueryParams) => {
  return useQuery<AnimeSearchResponse, Error>({
    queryKey: ['anime-search', query, page, limit],
    queryFn: ({ signal }) => fetchAnimeSearch({ query, page, limit }, signal),
    enabled: enabled && Boolean(query.trim()),
    placeholderData: (previous) => previous,
    staleTime: 30_000,
  })
}
