import { defineStore } from 'pinia'

import { fetchDetalleJuegoItems } from '../service/detalle-juego.service'
import type { DetalleJuegoState } from '../type/detalle-juego.types'

const createState = (): DetalleJuegoState => ({
  error: null,
  items: [],
  loading: false,
})

export const useDetalleJuegoStore = defineStore('detalleJuego', {
  actions: {
    async fetchItems() {
      this.loading = true
      this.error = null

      try {
        this.items = await fetchDetalleJuegoItems()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error inesperado'
      } finally {
        this.loading = false
      }
    },
  },
  state: createState,
})
