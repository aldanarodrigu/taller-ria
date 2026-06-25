import { defineStore } from 'pinia'

interface EstadoCargadorGlobal {
  cantidadSolicitudesActivas: number
  inicioCarga: number
}

const crearEstado = (): EstadoCargadorGlobal => ({
  cantidadSolicitudesActivas: 0,
  inicioCarga: 0,
})

const TIEMPO_MINIMO_VISIBLE = 600

export const useCargadorGlobalStore = defineStore('cargadorGlobal', {
  getters: {
    estaVisible: (state) => state.cantidadSolicitudesActivas > 0,
  },

  actions: {
    mostrarCargador() {
      if (this.cantidadSolicitudesActivas === 0) {
        this.inicioCarga = Date.now()
      }

      this.cantidadSolicitudesActivas += 1
    },

    ocultarCargador() {
      const tiempoVisible = Date.now() - this.inicioCarga
      const tiempoRestante = Math.max(0, TIEMPO_MINIMO_VISIBLE - tiempoVisible)

      window.setTimeout(() => {
        this.cantidadSolicitudesActivas = Math.max(0, this.cantidadSolicitudesActivas - 1)
      }, tiempoRestante)
    },
  },

  state: crearEstado,
})
