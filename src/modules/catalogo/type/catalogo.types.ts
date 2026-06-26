export interface JuegoRawg {
  id: number
  name: string
  released: string
  background_image: string
  rating: number
  platforms: { platform: { id: number; name: string } }[]
  genres: { id: number; name: string; slug: string }[]
}

export interface RespuestaRawg {
  count: number
  next: string | null
  previous: string | null
  results: JuegoRawg[]
}

export interface FiltrosCatalogo {
  genero: string
  plataforma: number | null
  orden: string
}

export interface CatalogoState {
  items: JuegoRawg[]
  loading: boolean
  error: string | null
  filtros: FiltrosCatalogo
  nextUrl: string | null
}
