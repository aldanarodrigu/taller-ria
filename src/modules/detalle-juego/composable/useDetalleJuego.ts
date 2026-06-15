import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import { detalleJuegoConfig } from '../config/detalle-juego.config'
import { useDetalleJuegoStore } from '../store/useDetalleJuegoStore'

function resolveGameId(idParam: string | string[] | undefined) {
  const rawId = Array.isArray(idParam) ? idParam[0] : idParam
  const id = Number(rawId)

  if (!Number.isInteger(id) || id <= 0) {
    return detalleJuegoConfig.fallbackGameId
  }

  return id
}

export function useDetalleJuego() {
  const route = useRoute()
  const store = useDetalleJuegoStore()

  const item = computed(() => store.item)
  const loading = computed(() => store.loading)
  const error = computed(() => store.error)
  const gameId = computed(() => resolveGameId(route.params.id as string | string[] | undefined))

  async function reload() {
    await store.fetchItem(gameId.value)
  }

  onMounted(() => {
    void reload()
  })

  watch(gameId, (nextId, previousId) => {
    if (previousId !== undefined && nextId !== previousId) {
      void store.fetchItem(nextId)
    }
  })

  return {
    error,
    item,
    loading,
    reload,
    store,
  }
}
