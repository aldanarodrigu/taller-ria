import { defineStore } from 'pinia'

import { catalogoConfig } from '../config/catalogo.config'
import { fetchJuegos, fetchPaginaSiguiente } from '../service/catalogo.service'
import type { CatalogoState, FiltrosCatalogo } from '../type/catalogo.types'

const filtrosIniciales: FiltrosCatalogo = {
  genero: '',
  plataforma: null,
  orden: '',
}

// recupera filtros guardados de la sesión anterior
function cargarFiltrosDeSession(): FiltrosCatalogo {
  const guardado = sessionStorage.getItem(catalogoConfig.sessionKey)
  if (!guardado) return { ...filtrosIniciales }
  try {
    return JSON.parse(guardado) as FiltrosCatalogo
  } catch {
    return { ...filtrosIniciales }
  }
}

const createState = (): CatalogoState => ({
  items: [],
  loading: false,
  error: null,
  filtros: cargarFiltrosDeSession(),
  nextUrl: null,
})

export const useCatalogoStore = defineStore('catalogo', {
  state: createState,

  actions: {
    async setFiltros(nuevosFiltros: Partial<FiltrosCatalogo>) {
      this.filtros = { ...this.filtros, ...nuevosFiltros }
      sessionStorage.setItem(catalogoConfig.sessionKey, JSON.stringify(this.filtros))
      await this.fetchItems()
    },

    async limpiarFiltros() {
      this.filtros = { ...filtrosIniciales }
      sessionStorage.removeItem(catalogoConfig.sessionKey)
      await this.fetchItems()
    },

    async fetchItems() {
      this.loading = true
      this.error = null

      try {
        const { results, next } = await fetchJuegos(this.filtros)
        this.items = results
        this.nextUrl = next
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error inesperado'
      } finally {
        this.loading = false
      }
    },

    async cargarMas() {
      if (!this.nextUrl || this.loading) return
      this.loading = true

      try {
        const { results, next } = await fetchPaginaSiguiente(this.nextUrl)
        this.items = [...this.items, ...results]
        this.nextUrl = next
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error inesperado'
      } finally {
        this.loading = false
      }
    },
  },
})
