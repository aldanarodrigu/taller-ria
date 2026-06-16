import { defineStore } from 'pinia'

import { useAutenticacionStore } from '@/modules/auth/store/useAuthStore'
import type { EstadoPerfil } from '../type/perfil.types'

import type { DatosPerfilEditable } from '../type/perfil.types'

const crearDatosVacios = (): DatosPerfilEditable => ({
  correo: '',
  nombreVisible: '',
})

const createState = (): EstadoPerfil => ({
  borrador: crearDatosVacios(),
  cargando: false,
  error: null,
  exito: null,
  guardando: false,
  perfil: null,
})

export const usePerfilStore = defineStore('perfil', {
  actions: {
    hidratarPerfil() {
      this.cargando = true
      this.error = null
      this.exito = null

      try {
        const authStore = useAutenticacionStore()

        if (!authStore.inicializado) {
          authStore.hidratarSesion()
        }

        if (!authStore.usuarioActual) {
          this.perfil = null
          this.borrador = crearDatosVacios()
          throw new Error('No hay una sesion activa')
        }

        const perfilActual: DatosPerfilEditable = {
          correo: authStore.usuarioActual.perfil.correo,
          nombreVisible: authStore.usuarioActual.perfil.nombreVisible,
        }

        this.perfil = perfilActual
        this.borrador = { ...perfilActual }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error inesperado'
      } finally {
        this.cargando = false
      }
    },

    actualizarBorrador(cambios: Partial<DatosPerfilEditable>) {
      this.borrador = {
        ...this.borrador,
        ...cambios,
      }
      this.exito = null
    },

    guardarPerfil() {
      this.guardando = true
      this.error = null
      this.exito = null

      try {
        const authStore = useAutenticacionStore()

        if (!authStore.inicializado) {
          authStore.hidratarSesion()
        }

        if (!authStore.usuarioActual) {
          throw new Error('No hay una sesion activa')
        }

        const datosActualizados: DatosPerfilEditable = {
          correo: this.borrador.correo.trim(),
          nombreVisible: this.borrador.nombreVisible.trim(),
        }

        const usuarioActualizado = authStore.actualizarPerfil(datosActualizados)
        const perfilActualizado: DatosPerfilEditable = {
          correo: usuarioActualizado.perfil.correo,
          nombreVisible: usuarioActualizado.perfil.nombreVisible,
        }

        this.perfil = perfilActualizado
        this.borrador = { ...perfilActualizado }
        this.exito = 'Perfil guardado correctamente'
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error inesperado'
      } finally {
        this.guardando = false
      }
    },

    limpiarMensajes() {
      this.error = null
      this.exito = null
    },

    restablecerBorrador() {
      this.borrador = this.perfil ? { ...this.perfil } : crearDatosVacios()
      this.error = null
      this.exito = null
    },
  },
  state: createState,
})
