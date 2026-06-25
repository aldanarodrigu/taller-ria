import { estadisticasConfig } from '../config/estadisticas.config'
import type { EstadisticasGeneroResponse } from '../type/estadisticas.types'

/**
 * Lista de generos con datos para usar en graficas.
 */
export async function getEstadisticasGenero() {
  const params = new URLSearchParams()
    params.set('key', estadisticasConfig.apiKey)

    const response = await fetch(`${estadisticasConfig.baseUrl}/genres${params.toString()}`)
    if (!response.ok) {
      throw new Error('No se pudieron cargar los datos del juego: ' + response.status)
    }

    return (await response.json()) as EstadisticasGeneroResponse
}

// exportamos el service asi llamamos una vez el service
export const estadisticasService = {
  getEstadisticasGenero,
}
