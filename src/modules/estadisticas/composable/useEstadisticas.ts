import { computed, onMounted } from 'vue'

import { useEstadisticasStore } from '../store/useEstadisticasStore'

export function useEstadisticas() {
  const store = useEstadisticasStore()

  const items = computed(() => store.items)
  const loading = computed(() => store.loading)
  const error = computed(() => store.error)
  const generos = computed(() => store.generos)

  async function getGeneros() {
    store.getGeneros()
  }

  onMounted(() => {
    getGeneros()
  })

  return {
    error,
    items,
    loading,
    store,
    getGeneros,
    generos,
  }
}
