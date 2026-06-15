import { defineStore } from 'pinia'

interface EstadoCargadorGlobal {
  cantidadSolicitudesActivas: number
}

const crearEstado = (): EstadoCargadorGlobal => ({
  cantidadSolicitudesActivas: 0,
})

export const useCargadorGlobalStore = defineStore('cargadorGlobal', {
  getters: {
    estaVisible: (state) => state.cantidadSolicitudesActivas > 0,
  },

  actions: {
    mostrarCargador() {
      this.cantidadSolicitudesActivas += 1
    },

    ocultarCargador() {
      this.cantidadSolicitudesActivas = Math.max(0, this.cantidadSolicitudesActivas - 1)
    },
  },

  state: crearEstado,
})
