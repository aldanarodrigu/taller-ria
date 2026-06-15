import { homeConfig } from '../config/home.config'
import type { JuegoRawg, RespuestaRawg } from '../types/home.types'

export async function fetchJuegosPopulares(): Promise<JuegoRawg[]> {
  const params = new URLSearchParams()
  params.set('key', homeConfig.apiKey)
  params.set('ordering', '-rating')

  const response = await fetch(`${homeConfig.baseUrl}/games?${params.toString()}`)
  if (!response.ok) {
    throw new Error('No se pudieron cargar los juegos populares: ' + response.status)
  }
  const data = (await response.json()) as RespuestaRawg
  return data.results
}

export async function fetchJuegosNuevos(): Promise<JuegoRawg[]> {
  const params = new URLSearchParams()
  params.set('key', homeConfig.apiKey)
  params.set('ordering', '-released')

  const response = await fetch(`${homeConfig.baseUrl}/games?${params.toString()}`)
  if (!response.ok) {
    throw new Error('No se pudieron cargar las novedades: ' + response.status)
  }
  const data = (await response.json()) as RespuestaRawg
  return data.results
}
