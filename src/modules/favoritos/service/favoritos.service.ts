import { favoritosConfig } from '../config/favoritos.config'
import type { FavoritosItem } from '../type/favoritos.types'

export async function fetchFavoritosItems(): Promise<FavoritosItem[]> {
  const response = await fetch(`${favoritosConfig.baseUrl}/items`)

  if (!response.ok) {
    throw new Error('No se pudieron cargar los datos de favoritos: ' + response.status + ' ' + response.statusText)
  }

  return (await response.json()) as FavoritosItem[]
}
