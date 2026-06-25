import { defineStore } from 'pinia'
import type { EstadisticasState} from '../type/estadisticas.types'
import { estadisticasService } from '../service/estadisticas.service'
import { useCargadorGlobalStore } from '@/shared/store/useCargadorGlobalStore'

const createState = (): EstadisticasState => ({
  error: null,
  items: [],
  loading: false,
  generos: null,
})

export const useEstadisticasStore = defineStore('estadisticas', {
  actions: {
    async getGeneros(){
      const loaderGlobal = useCargadorGlobalStore()

      this.error = null
      this.items = []
      this.loading = true

      loaderGlobal.mostrarCargador()
      try {
         this.generos = await estadisticasService.getEstadisticasGenero()
      }
      catch (error) {
        this.error = error instanceof Error ? error.message : 'Error inesperado'
      }
      finally {
        this.loading = false
        loaderGlobal.ocultarCargador()
      }
    },
  },
  state: createState,
})
