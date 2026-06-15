import { detalleJuegoConfig } from '../config/detalle-juego.config'
import type { DetalleJuego } from '../type/detalle-juego.types'

/**
 * En base a un id de un juego retorna el detalle de ese juego.
 * @param id id del juego
 * @returns retorna el detalle de un juego en particular
 */
export async function obtenerDetalleJuego(id: number): Promise<DetalleJuego> {
  const params = new URLSearchParams()
  params.set('key', detalleJuegoConfig.apiKey)

  const response = await fetch(`${detalleJuegoConfig.baseUrl}/games/${id}?${params.toString()}`)

  if (!response.ok) {
    throw new Error('No se pudieron cargar los datos del juego: ' + response.status)
  }

  return (await response.json()) as DetalleJuego
}

export const detalleJuegoService = {
  obtenerDetalleJuego,
}
