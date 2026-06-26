import { computed, onMounted } from 'vue'

import { useCatalogoStore } from '../store/useCatalogoStore'
import type { FiltrosCatalogo } from '../type/catalogo.types'

export function useCatalogo() {
  const store = useCatalogoStore()

  const items = computed(() => store.items)
  const loading = computed(() => store.loading)
  const error = computed(() => store.error)
  const filtros = computed(() => store.filtros)
  const hayMas = computed(() => store.nextUrl !== null)

  async function aplicarFiltro(filtro: Partial<FiltrosCatalogo>) {
    await store.setFiltros(filtro)
  }

  async function limpiarFiltros() {
    await store.limpiarFiltros()
  }

  async function cargarMas() {
    await store.cargarMas()
  }

  onMounted(() => {
    void store.fetchItems()
  })

  return {
    items,
    loading,
    error,
    filtros,
    hayMas,
    aplicarFiltro,
    limpiarFiltros,
    cargarMas,
  }
}
