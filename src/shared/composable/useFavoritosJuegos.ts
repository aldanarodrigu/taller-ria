import { computed, ref, watch, type ComputedRef, type Ref } from 'vue'

import { rehidratarJuegosFavoritos } from '../service/favoritos.service'
import type { JuegoFavoritoResumen } from '../type/favoritos.types'

export function useFavoritosJuegos(
  favoritosIds: ComputedRef<number[]>,
  habilitado: Ref<boolean> | ComputedRef<boolean> = computed(() => true),
) {
  const items = ref<JuegoFavoritoResumen[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  let requestId = 0

  async function recargar() {
    const ids = favoritosIds.value
    const estaHabilitado = habilitado.value

    if (!estaHabilitado) {
      return
    }

    requestId += 1
    const requestActual = requestId

    if (ids.length === 0) {
      items.value = []
      error.value = null
      loading.value = false
      return
    }

    loading.value = true
    error.value = null

    try {
      const resultado = await rehidratarJuegosFavoritos(ids)

      if (requestActual !== requestId) {
        return
      }

      items.value = resultado.items
      error.value = resultado.error
    } catch (cause) {
      if (requestActual !== requestId) {
        return
      }

      error.value = cause instanceof Error ? cause.message : 'Error inesperado al cargar favoritos.'
      items.value = []
    } finally {
      if (requestActual === requestId) {
        loading.value = false
      }
    }
  }

  watch([favoritosIds, habilitado], () => {
    void recargar()
  }, { immediate: true })

  return {
    error,
    items,
    loading,
    recargar,
  }
}
