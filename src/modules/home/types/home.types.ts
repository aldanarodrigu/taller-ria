export interface JuegoRawg {
  id: number
  name: string
  slug: string
  background_image: string | null
  rating: number
  released: string
  genres: { id: number; name: string }[]
  platforms: { platform: { id: number; name: string } }[]
}

export interface RespuestaRawg {
  count: number
  next: string | null
  previous: string | null
  results: JuegoRawg[]
}
