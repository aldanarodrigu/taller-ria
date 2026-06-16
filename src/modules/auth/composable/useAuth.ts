import { computed, onMounted } from 'vue'

import { useAuthStore } from '../store/useAuthStore'

export function useAuth() {
  const store = useAuthStore()

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
