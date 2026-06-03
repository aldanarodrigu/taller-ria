import { detalle-juegoConfig } from '../config/detalle-juego.config'
import type { DetalleJuegoItem } from '../type/detalle-juego.types'

export async function fetchDetalleJuegoItems(): Promise<DetalleJuegoItem[]> {
  const response = await fetch(`${detalle-juegoConfig.baseUrl}/items`)

  if (!response.ok) {
    throw new Error('No se pudieron cargar los datos de detalle-juego: ' + response.status + ' ' + response.statusText)
  }

  return (await response.json()) as DetalleJuegoItem[]
}
