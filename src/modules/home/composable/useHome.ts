import { ref, onMounted } from 'vue'
import { fetchJuegosPopulares, fetchJuegosNuevos } from '../service/home.service'
import type { JuegoRawg } from '../types/home.types'

export function useHome() {
  const juegosPopulares = ref<JuegoRawg[]>([])
  const juegosNuevos = ref<JuegoRawg[]>([])
  const cargando = ref(false)
  const error = ref<string | null>(null)

  async function cargarDatos() {
    cargando.value = true
    error.value = null
    try {
      const [populares, nuevos] = await Promise.all([fetchJuegosPopulares(), fetchJuegosNuevos()])
      juegosPopulares.value = populares
      juegosNuevos.value = nuevos
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error desconocido'
    } finally {
      cargando.value = false
    }
  }

  onMounted(cargarDatos)

  return { juegosPopulares, juegosNuevos, cargando, error }
}
