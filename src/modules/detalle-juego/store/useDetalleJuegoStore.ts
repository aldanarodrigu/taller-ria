import { defineStore } from 'pinia'
import type { DetalleJuegoState } from '../type/detalle-juego.types'
import { detalleJuegoService } from '../service/detalle-juego.service'
const createState = (): DetalleJuegoState => ({
  error: null,
  item: null,
  loading: false,
})

export const useDetalleJuegoStore = defineStore('detalleJuego', {
  actions: {
    async fetchItem(id: number) {
      this.loading = true
      this.error = null
      this.item = null

      try {
        this.item = await detalleJuegoService.getDetalleJuego(id)
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error inesperado'
      } finally {
        this.loading = false
      }
    },
  },
  state: createState,
})
