import { detalleJuegoService } from '@/modules/detalle-juego/service/detalle-juego.service'
import type { DetalleJuego } from '@/modules/detalle-juego/type/detalle-juego.types'

import type {
  JuegoFavoritoResumen,
  ResultadoFavoritosRehidratados,
} from '../type/favoritos.types'

function mapearDetalleAFavorito(detalle: DetalleJuego): JuegoFavoritoResumen {
  return {
    id: detalle.id,
    name: detalle.name,
    backgroundImage: detalle.background_image ?? null,
    platforms: detalle.platforms.map((item) => item.platform.name),
    rating: detalle.rating,
    released: detalle.released,
  }
}

export async function rehidratarJuegosFavoritos(
  favoritosIds: number[],
): Promise<ResultadoFavoritosRehidratados> {
  const idsNormalizados = [...new Set(favoritosIds)]

  if (idsNormalizados.length === 0) {
    return {
      error: null,
      items: [],
    }
  }

  const resultados = await Promise.allSettled(
    idsNormalizados.map((id) => detalleJuegoService.obtenerDetalleJuego(id)),
  )

  const items = resultados.flatMap((resultado) =>
    resultado.status === 'fulfilled' ? [mapearDetalleAFavorito(resultado.value)] : [],
  )

  const cantidadFallidos = resultados.length - items.length

  if (cantidadFallidos === 0) {
    return { items, error: null }
  }

  if (items.length === 0) {
    return {
      items,
      error: 'No se pudieron cargar tus juegos favoritos en este momento.',
    }
  }

  return {
    items,
    error: 'Algunos juegos favoritos no se pudieron actualizar.',
  }
}
