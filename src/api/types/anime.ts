export interface ImageFormat {
  image_url: string
  small_image_url?: string
  large_image_url?: string
}

export interface AnimeImages {
  jpg: ImageFormat
  webp?: ImageFormat & { image_url?: string }
}

export interface AnimeTitle {
  type: string
  title: string
}

export interface AnimeGenre {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface AnimeBroadcast {
  day?: string
  time?: string
  timezone?: string
  string?: string
}

export interface AnimeAired {
  from?: string
  to?: string
  string?: string
}

export interface AnimeTrailer {
  youtube_id?: string
  url?: string
  embed_url?: string
  images?: {
    image_url?: string
    large_image_url?: string
    small_image_url?: string
    medium_image_url?: string
    maximum_image_url?: string
  }
}

export interface AnimeStudio {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface Anime {
  mal_id: number
  url: string
  images: AnimeImages
  title: string
  title_english?: string | null
  titles?: AnimeTitle[]
  type?: string
  episodes?: number | null
  status?: string
  duration?: string
  rating?: string | null
  score?: number | null
  scored_by?: number | null
  rank?: number | null
  popularity?: number | null
  members?: number | null
  favorites?: number | null
  synopsis?: string | null
  background?: string | null
  season?: string | null
  year?: number | null
  broadcast?: AnimeBroadcast | null
  aired?: AnimeAired | null
  trailer?: AnimeTrailer | null
  genres?: AnimeGenre[]
  studios?: AnimeStudio[]
}

export interface PaginationItems {
  count: number
  total: number
  per_page: number
}

export interface PaginationInfo {
  last_visible_page: number
  has_next_page: boolean
  current_page?: number
  items: PaginationItems
}

export interface AnimeSearchResponse {
  data: Anime[]
  pagination: PaginationInfo
}

export interface AnimeDetailResponse {
  data: Anime
}
