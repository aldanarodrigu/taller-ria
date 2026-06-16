import { defineStore } from 'pinia'

import { fetchAuthItems } from '../service/auth.service'
import type { AuthState } from '../type/auth.types'

const createState = (): AuthState => ({
  error: null,
  items: [],
  loading: false,
})

export const useAuthStore = defineStore('auth', {
  actions: {
    async fetchItems() {
      this.loading = true
      this.error = null

      try {
        this.items = await fetchAuthItems()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error inesperado'
      } finally {
        this.loading = false
      }
    },
  },
  state: createState,
})
