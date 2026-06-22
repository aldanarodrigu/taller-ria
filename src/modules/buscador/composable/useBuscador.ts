import { computed, onMounted } from 'vue'

import { useBuscadorStore } from '../store/useBuscadorStore'

export function useBuscador() {
  const store = useBuscadorStore()

  const query = computed(() => store.query)
  const items = computed(() => store.items)
  const loading = computed(() => store.loading)
  const error = computed(() => store.error)

  async function buscar(valor: string) {
    await store.setQuery(valor)
    await store.searchItems()
  }

  async function limpiar() {
    await store.clearQuery()
  }

  onMounted(() => {
    if (store.query) {
      void store.searchItems()
    }
  })

  return {
    query,
    items,
    loading,
    error,
    buscar,
    limpiar,
  }
}
