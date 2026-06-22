import { buscadorConfig } from '../config/buscador.config'
import type { JuegoRawg, RespuestaRawg } from '../type/buscador.types'

export interface PaginatedResponse {
  results: JuegoRawg[]
  count: number
}

export async function fetchJuegosPorBusqueda(query: string, page: number = 1): Promise<PaginatedResponse> {
  if (!query.trim()) {
    return { results: [], count: 0 }
  }

  const params = new URLSearchParams()
  params.set('key', buscadorConfig.apiKey)
  params.set('search', query.trim())
  params.set('page_size', '20')
  params.set('page', String(page))

  const response = await fetch(`${buscadorConfig.baseUrl}/games?${params.toString()}`)

  if (!response.ok) {
    throw new Error('No se pudieron cargar los resultados de búsqueda: ' + response.status)
  }

  const data = (await response.json()) as RespuestaRawg
  return {
    results: data.results,
    count: data.count,
  }
}

export async function fetchJuegoDetalle(id: number): Promise<JuegoRawg> {
  const params = new URLSearchParams()
  params.set('key', buscadorConfig.apiKey)

  const response = await fetch(`${buscadorConfig.baseUrl}/games/${id}?${params.toString()}`)

  if (!response.ok) {
    throw new Error('No se pudieron cargar los detalles del juego: ' + response.status)
  }

  return (await response.json()) as JuegoRawg
}
