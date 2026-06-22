import { computed, onMounted } from 'vue'

import { useBuscadorStore } from '../store/useBuscadorStore'

export function useBuscador() {
  const store = useBuscadorStore()

  const query = computed(() => store.query)
  const items = computed(() => store.items)
  const loading = computed(() => store.loading)
  const error = computed(() => store.error)
  const currentPage = computed(() => store.currentPage)
  const totalCount = computed(() => store.totalCount)
  const pageSize = computed(() => store.pageSize)
  const totalPages = computed(() => Math.ceil(totalCount.value / pageSize.value))

  async function buscar(valor: string) {
    await store.setQuery(valor)
    await store.searchItems(1)
  }

  async function goToPage(page: number) {
    await store.searchItems(page)
  }

  async function limpiar() {
    await store.clearQuery()
  }

  onMounted(() => {
    if (store.query) {
      void store.searchItems()
    } else {
      void store.fetchDefaultItems()
    }
  })

  return {
    query,
    items,
    loading,
    error,
    currentPage,
    totalCount,
    pageSize,
    totalPages,
    buscar,
    goToPage,
    limpiar,
  }
}
