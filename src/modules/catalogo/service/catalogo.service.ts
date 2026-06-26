import { catalogoConfig } from '../config/catalogo.config'
import type { FiltrosCatalogo, JuegoRawg, RespuestaRawg } from '../type/catalogo.types'

export async function fetchJuegos(
  filtros: FiltrosCatalogo,
): Promise<{ results: JuegoRawg[]; next: string | null }> {
  const params = new URLSearchParams()
  params.set('key', catalogoConfig.apiKey)

  if (filtros.genero) params.set('genres', filtros.genero)
  if (filtros.plataforma !== null) params.set('platforms', String(filtros.plataforma))
  if (filtros.orden) params.set('ordering', filtros.orden)

  const response = await fetch(`${catalogoConfig.baseUrl}/games?${params.toString()}`)

  if (!response.ok) {
    throw new Error('No se pudieron cargar los juegos: ' + response.status)
  }

  const data = (await response.json()) as RespuestaRawg
  return { results: data.results, next: data.next }
}

export async function fetchPaginaSiguiente(
  url: string,
): Promise<{ results: JuegoRawg[]; next: string | null }> {
  const urlProxy = url.replace('https://api.rawg.io/api', catalogoConfig.baseUrl)
  const response = await fetch(urlProxy)

  if (!response.ok) {
    throw new Error('No se pudieron cargar más juegos: ' + response.status)
  }

  const data = (await response.json()) as RespuestaRawg
  return { results: data.results, next: data.next }
}
