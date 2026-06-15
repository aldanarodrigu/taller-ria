import type {
  DatosCabeceraDetalleJuego,
  DatosDescripcionDetalleJuego,
  DatosPlataformaDetalleJuego,
  DatosResumenDetalleJuego,
  DatosTiendaDetalleJuego,
  DetalleJuego,
  DetalleJuegoPreparado,
} from '../type/detalle-juego.types'

function formatearFecha(fecha: string) {
  if (!fecha) return 'Sin fecha'

  const fechaConvertida = new Date(`${fecha}T00:00:00`)

  if (Number.isNaN(fechaConvertida.getTime())) {
    return 'Sin fecha'
  }

  return new Intl.DateTimeFormat('es-UY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(fechaConvertida)
}

function formatearPuntaje(puntaje: number | null) {
  if (puntaje === null) return 'Sin puntaje'

  return new Intl.NumberFormat('es-UY', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  }).format(puntaje)
}

function prepararCabecera(detalle: DetalleJuego): DatosCabeceraDetalleJuego {
  return {
    titulo: detalle.name,
    tituloOriginal: detalle.name_original,
    imagenPrincipal: detalle.background_image || null,
    imagenSecundaria: detalle.background_image_additional || null,
  }
}

function prepararResumen(detalle: DetalleJuego): DatosResumenDetalleJuego {
  return {
    datosDestacados: [
      { etiqueta: 'Lanzamiento', valor: formatearFecha(detalle.released) },
      { etiqueta: 'Puntaje', valor: formatearPuntaje(detalle.rating) },
      { etiqueta: 'Metacritic', valor: detalle.metacritic === null ? 'Sin puntaje' : String(detalle.metacritic) },
      { etiqueta: 'Clasificación', valor: detalle.esrb_rating?.name || 'Sin clasificación' },
    ],
    desarrolladoras: detalle.developers.map((desarrolladora) => desarrolladora.name),
    generos: detalle.genres.map((genero) => genero.name),
    etiquetas: detalle.tags.slice(0, 6).map((etiqueta) => etiqueta.name),
  }
}

function prepararDescripcion(detalle: DetalleJuego): DatosDescripcionDetalleJuego {
  return {
    descripcion: detalle.description_raw || 'Sin descripción disponible.',
    sitioWeb: detalle.website || null,
  }
}

function prepararPlataformas(detalle: DetalleJuego): DatosPlataformaDetalleJuego[] {
  return detalle.platforms.map((plataforma) => ({
    id: plataforma.platform.id,
    nombre: plataforma.platform.name,
    fechaLanzamiento: formatearFecha(plataforma.released_at),
    requisitosMinimos: plataforma.requirements.minimum || null,
    requisitosRecomendados: plataforma.requirements.recommended || null,
  }))
}

function prepararTiendas(detalle: DetalleJuego): DatosTiendaDetalleJuego[] {
  return detalle.stores.map((tienda) => ({
    id: tienda.id,
    nombre: tienda.store.name,
    dominio: tienda.store.domain,
    enlace: tienda.url || (tienda.store.domain ? `https://${tienda.store.domain}` : null),
  }))
}

export function prepararDetalleJuego(detalle: DetalleJuego): DetalleJuegoPreparado {
  return {
    cabecera: prepararCabecera(detalle),
    resumen: prepararResumen(detalle),
    descripcion: prepararDescripcion(detalle),
    plataformas: prepararPlataformas(detalle),
    tiendas: prepararTiendas(detalle),
  }
}
