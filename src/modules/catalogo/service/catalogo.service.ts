import { catalogoConfig } from '../config/catalogo.config'
import type { FiltrosCatalogo, JuegoRawg, RespuestaRawg } from '../type/catalogo.types'

export async function fetchJuegos(filtros: FiltrosCatalogo): Promise<JuegoRawg[]> {
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
  return data.results
}
