import { computed, onMounted } from 'vue'

import { usePerfilStore } from '../store/usePerfilStore'

export function usePerfil() {
  const store = usePerfilStore()

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
