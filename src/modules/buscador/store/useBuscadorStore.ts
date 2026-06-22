import { defineStore } from 'pinia'

import { buscadorConfig } from '../config/buscador.config'
import { fetchJuegosPorBusqueda } from '../service/buscador.service'
import type { BuscadorState } from '../type/buscador.types'

const createState = (): BuscadorState => ({
  query: sessionStorage.getItem(buscadorConfig.sessionKey) ?? '',
  items: [],
  loading: false,
  error: null,
})

export const useBuscadorStore = defineStore('buscador', {
  state: createState,

  actions: {
    async setQuery(nuevaQuery: string) {
      this.query = nuevaQuery.trim()
      sessionStorage.setItem(buscadorConfig.sessionKey, this.query)
    },

    async clearQuery() {
      this.query = ''
      this.items = []
      sessionStorage.removeItem(buscadorConfig.sessionKey)
    },

    async searchItems() {
      if (!this.query) {
        this.items = []
        return
      }

      this.loading = true
      this.error = null

      try {
        this.items = await fetchJuegosPorBusqueda(this.query)
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error inesperado'
      } finally {
        this.loading = false
      }
    },
  },
})
