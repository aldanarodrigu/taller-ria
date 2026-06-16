export interface JuegoFavoritoResumen {
  id: number
  name: string
  backgroundImage: string | null
  rating: number
  released: string
  platforms: string[]
}

export interface ResultadoFavoritosRehidratados {
  items: JuegoFavoritoResumen[]
  error: string | null
}
