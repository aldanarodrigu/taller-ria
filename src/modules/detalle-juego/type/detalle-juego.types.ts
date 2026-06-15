export interface RespuestaBase {
  id: number
  name: string
  slug: string
}

export interface RespuestaConImagen extends RespuestaBase {
  games_count: number
  image_background: string
}

export interface PuntajePorPlataformas {
  metascore: number
  url: string
  platform: {
    platform: number
    name: string
    slug: string
  }
}

export interface Puntaje {
  id: number
  title: string
  count: number
  percent: number
}

export interface PlataformaDetallada {
  id: number
  name: string
  slug: string
  image: string | null
  year_end: number | null
  year_start: number | null
  games_count: number
  image_background: string
}

export interface Requerimientos {
  minimum?: string
  recommended?: string
}

export interface DetallesPlataforma {
  platform: PlataformaDetallada
  released_at: string
  requirements: Requerimientos
}

export interface PlataformaBase {
  platform: RespuestaBase
}

export interface TiendasDeVenta {
  id: number
  name: string
  slug: string
  domain: string
  games_count: number
  image_background: string
}

export interface TiendasDeVentaDetalle {
  id: number
  url: string
  store: TiendasDeVenta
}

export interface CalificacionESRB {
  id: number
  name: string
  slug: string
}

export interface DetalleJuego {
  id: number
  slug: string
  name: string
  name_original: string
  description: string
  description_raw: string
  metacritic: number | null
  metacritic_platforms: PuntajePorPlataformas[]
  released: string
  tba: boolean
  updated: string
  background_image: string
  background_image_additional: string
  website: string
  rating: number
  rating_top: number
  ratings: Puntaje[]
  reactions: Record<string, number>
  added: number
  added_by_status: Record<string, number>
  playtime: number
  screenshots_count: number
  movies_count: number
  creators_count: number
  achievements_count: number
  parent_achievements_count: number
  reddit_url: string
  reddit_name: string
  reddit_description: string
  reddit_logo: string
  reddit_count: number
  twitch_count: number
  youtube_count: number
  reviews_text_count: number
  ratings_count: number
  suggestions_count: number
  alternative_names: string[]
  metacritic_url: string
  parents_count: number
  additions_count: number
  game_series_count: number
  user_game: unknown | null
  reviews_count: number
  saturated_color: string
  dominant_color: string
  parent_platforms: PlataformaBase[]
  platforms: DetallesPlataforma[]
  stores: TiendasDeVentaDetalle[]
  developers: RespuestaConImagen[]
  genres: RespuestaConImagen[]
  tags: Array<RespuestaConImagen & { language: string }>
  publishers: RespuestaConImagen[]
  esrb_rating: CalificacionESRB | null
  clip: unknown | null
}

export interface DetalleJuegoState {
  error: string | null
  item: DetalleJuego | null
  loading: boolean
}
