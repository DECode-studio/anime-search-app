import type { AnimeDetailResponse, AnimeSearchResponse } from './types/anime'

const API_BASE_URL = 'https://api.jikan.moe/v4'

const createUrl = (path: string, params?: Record<string, string | number | boolean | undefined | null>) => {
  const url = new URL(`${API_BASE_URL}${path}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value))
      }
    })
  }
  return url.toString()
}

const fetchFromApi = async <T>(input: string, signal?: AbortSignal): Promise<T> => {
  const response = await fetch(input, { signal })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Failed to fetch data from Jikan API')
  }

  return response.json() as Promise<T>
}

export interface AnimeSearchParams {
  query: string
  page: number
  limit: number
  orderBy?: 'score' | 'popularity' | 'favorites'
  sort?: 'asc' | 'desc'
}

export const fetchAnimeSearch = async (
  { query, page, limit, orderBy = 'score', sort = 'desc' }: AnimeSearchParams,
  signal?: AbortSignal,
): Promise<AnimeSearchResponse> => {
  const url = createUrl('/anime', {
    q: query,
    page,
    limit,
    order_by: orderBy,
    sort,
    sfw: true,
  })

  return fetchFromApi<AnimeSearchResponse>(url, signal)
}

export const fetchAnimeDetails = async (id: string, signal?: AbortSignal): Promise<AnimeDetailResponse> => {
  const url = createUrl(`/anime/${id}/full`)
  return fetchFromApi<AnimeDetailResponse>(url, signal)
}
