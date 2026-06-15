import { detalleJuegoConfig } from '../config/detalle-juego.config'
import type { DetalleJuegoItem } from '../type/detalle-juego.types'

export async function fetchDetalleJuegoItems(): Promise<DetalleJuegoItem[]> {
  const response = await fetch(`${detalleJuegoConfig.baseUrl}/items`)

  if (!response.ok) {
    throw new Error('No se pudieron cargar los datos de detalle-juego: ' + response.status + ' ' + response.statusText)
  }

  return (await response.json()) as DetalleJuegoItem[]
}
