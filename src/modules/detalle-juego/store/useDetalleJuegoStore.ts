import { defineStore } from 'pinia'

import { useCargadorGlobalStore } from '@/shared/store/useCargadorGlobalStore'

import type { EstadoDetalleJuego } from '../type/detalle-juego.types'
import { detalleJuegoService } from '../service/detalle-juego.service'

const crearEstado = (): EstadoDetalleJuego => ({
  mensajeError: null,
  detalle: null,
  estaCargando: false,
})

export const useDetalleJuegoStore = defineStore('detalleJuego', {
  actions: {
    async obtenerDetalle(id: number) {
      const cargadorGlobalStore = useCargadorGlobalStore()

      this.estaCargando = true
      this.mensajeError = null
      this.detalle = null
      cargadorGlobalStore.mostrarCargador()

      try {
        this.detalle = await detalleJuegoService.obtenerDetalleJuego(id)
      } catch (error) {
        this.mensajeError = error instanceof Error ? error.message : 'Error inesperado'
      } finally {
        this.estaCargando = false
        cargadorGlobalStore.ocultarCargador()
      }
    },
  },
  state: crearEstado,
})
