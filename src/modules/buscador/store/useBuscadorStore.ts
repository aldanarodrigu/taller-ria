import { defineStore } from 'pinia'

import { buscadorConfig } from '../config/buscador.config'
import { fetchJuegosPorBusqueda, type PaginatedResponse } from '../service/buscador.service'
import type { BuscadorState } from '../type/buscador.types'

const createState = (): BuscadorState => ({
  query: sessionStorage.getItem(buscadorConfig.sessionKey) ?? '',
  items: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalCount: 0,
  pageSize: 20,
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

    async searchItems(page: number = 1) {
      this.currentPage = page

      if (!this.query) {
        this.items = []
        this.totalCount = 0
        return
      }

      this.loading = true
      this.error = null

      try {
        const response = await fetchJuegosPorBusqueda(this.query, page)
        this.items = response.results
        this.totalCount = response.count
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error inesperado'
      } finally {
        this.loading = false
      }
    },

    async fetchDefaultItems() {
      this.loading = true
      this.error = null

      try {
        const response = await fetchJuegosPorBusqueda('action', 1)
        this.items = response.results
        this.totalCount = response.count
        this.query = 'action'
        this.currentPage = 1
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error inesperado'
      } finally {
        this.loading = false
      }
    },
  },
})
