import { defineStore } from 'pinia'

import { fetchFavoritosItems } from '../service/favoritos.service'
import type { FavoritosState } from '../type/favoritos.types'

const createState = (): FavoritosState => ({
  error: null,
  items: [],
  loading: false,
})

export const useFavoritosStore = defineStore('favoritos', {
  actions: {
    async fetchItems() {
      this.loading = true
      this.error = null

      try {
        this.items = await fetchFavoritosItems()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error inesperado'
      } finally {
        this.loading = false
      }
    },
  },
  state: createState,
})
