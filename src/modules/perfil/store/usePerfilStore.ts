import { defineStore } from 'pinia'

import { fetchPerfilItems } from '../service/perfil.service'
import type { PerfilState } from '../type/perfil.types'

const createState = (): PerfilState => ({
  error: null,
  items: [],
  loading: false,
})

export const usePerfilStore = defineStore('perfil', {
  actions: {
    async fetchItems() {
      this.loading = true
      this.error = null

      try {
        this.items = await fetchPerfilItems()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error inesperado'
      } finally {
        this.loading = false
      }
    },
  },
  state: createState,
})
