import { computed, onMounted } from 'vue'

import { useDetalleJuegoStore } from '../store/useDetalleJuegoStore'

export function useDetalleJuego() {
  const store = useDetalleJuegoStore()

  const items = computed(() => store.items)
  const loading = computed(() => store.loading)
  const error = computed(() => store.error)

  async function reload() {
    await store.fetchItems()
  }

  onMounted(() => {
    void store.fetchItems()
  })

  return {
    error,
    items,
    loading,
    reload,
    store,
  }
}
