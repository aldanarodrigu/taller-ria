import { computed, onMounted } from 'vue'

import { useCatalogoStore } from '../store/useCatalogoStore'
import type { FiltrosCatalogo } from '../type/catalogo.types'

export function useCatalogo() {
  const store = useCatalogoStore()

  const items = computed(() => store.items)
  const loading = computed(() => store.loading)
  const error = computed(() => store.error)
  const filtros = computed(() => store.filtros)

  async function aplicarFiltro(filtro: Partial<FiltrosCatalogo>) {
    await store.setFiltros(filtro)
  }

  async function limpiarFiltros() {
    await store.limpiarFiltros()
  }

  onMounted(() => {
    void store.fetchItems()
  })

  return {
    items,
    loading,
    error,
    filtros,
    aplicarFiltro,
    limpiarFiltros,
  }
}
