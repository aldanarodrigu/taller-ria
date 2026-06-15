import { defineStore } from 'pinia'
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
      this.estaCargando = true
      this.mensajeError = null
      this.detalle = null

      try {
        this.detalle = await detalleJuegoService.obtenerDetalleJuego(id)
      } catch (error) {
        this.mensajeError = error instanceof Error ? error.message : 'Error inesperado'
      } finally {
        this.estaCargando = false
      }
    },
  },
  state: crearEstado,
})
