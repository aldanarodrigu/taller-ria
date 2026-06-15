import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import { prepararDetalleJuego } from './prepararDetalleJuego'
import { detalleJuegoConfig } from '../config/detalle-juego.config'
import { useDetalleJuegoStore } from '../store/useDetalleJuegoStore'

function resolverIdJuego(idParametro: string | string[] | undefined) {
  const idTexto = Array.isArray(idParametro) ? idParametro[0] : idParametro
  const id = Number(idTexto)

  if (!Number.isInteger(id) || id <= 0) {
    return detalleJuegoConfig.fallbackGameId
  }

  return id
}

export function useDetalleJuego() {
  const ruta = useRoute()
  const almacenamiento = useDetalleJuegoStore()

  const detalle = computed(() => almacenamiento.detalle)
  const estaCargando = computed(() => almacenamiento.estaCargando)
  const mensajeError = computed(() => almacenamiento.mensajeError)
  const idJuego = computed(() => resolverIdJuego(ruta.params.id as string | string[] | undefined))
  const detallePreparado = computed(() =>
    detalle.value ? prepararDetalleJuego(detalle.value) : null
  )

  async function recargar() {
    await almacenamiento.obtenerDetalle(idJuego.value)
  }

  onMounted(() => {
    void recargar()
  })

  watch(idJuego, (siguienteId, idAnterior) => {
    if (idAnterior !== undefined && siguienteId !== idAnterior) {
      void almacenamiento.obtenerDetalle(siguienteId)
    }
  })

  return {
    detalle,
    detallePreparado,
    estaCargando,
    mensajeError,
    recargar,
  }
}
