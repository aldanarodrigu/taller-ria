import { defineStore } from 'pinia'

import {
  actualizarPerfilUsuario,
  buscarUsuarioPorId,
  cerrarSesion,
  iniciarSesion,
  limpiarSesion,
  obtenerSesionGuardada,
  obtenerUsuariosGuardados,
  registrarUsuario,
  toggleFavoritoUsuarioActual,
} from '../service/auth.service'
import type { DatosPerfilEditable } from '@/modules/perfil/type/perfil.types'
import type {
  CredencialesInicioSesion,
  DatosRegistro,
  EstadoAuth,
} from '../type/auth.types'

const crearEstado = (): EstadoAuth => ({
  cargando: false,
  error: null,
  inicializado: false,
  usuarioActual: null,
  usuarios: [],
})

export const useAutenticacionStore = defineStore('auth', {
  state: crearEstado,

  actions: {
    hidratarSesion() {
      this.cargando = true
      this.error = null

      try {
        const usuarios = obtenerUsuariosGuardados()
        const sesion = obtenerSesionGuardada()
        const usuarioActual = sesion ? buscarUsuarioPorId(sesion.usuarioId, usuarios) : null

        if (sesion && !usuarioActual) {
          limpiarSesion()
        }

        this.usuarios = usuarios
        this.usuarioActual = usuarioActual
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error inesperado'
      } finally {
        this.cargando = false
        this.inicializado = true
      }
    },

    registrarse(datos: DatosRegistro) {
      this.cargando = true
      this.error = null

      try {
        const usuario = registrarUsuario(datos)
        this.usuarios = obtenerUsuariosGuardados()
        this.usuarioActual = usuario
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error inesperado'
        throw error
      } finally {
        this.cargando = false
        this.inicializado = true
      }
    },

    iniciarSesion(credenciales: CredencialesInicioSesion) {
      this.cargando = true
      this.error = null

      try {
        const usuario = iniciarSesion(credenciales)
        this.usuarios = obtenerUsuariosGuardados()
        this.usuarioActual = usuario
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error inesperado'
        throw error
      } finally {
        this.cargando = false
        this.inicializado = true
      }
    },

    cerrarSesion() {
      this.cargando = true
      this.error = null

      try {
        cerrarSesion()
        this.usuarioActual = null
        this.usuarios = obtenerUsuariosGuardados()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error inesperado'
        throw error
      } finally {
        this.cargando = false
        this.inicializado = true
      }
    },

    actualizarPerfil(datos: DatosPerfilEditable) {
      this.error = null

      try {
        const usuarioActualizado = actualizarPerfilUsuario(datos)
        this.usuarios = obtenerUsuariosGuardados()
        this.usuarioActual = usuarioActualizado

        return usuarioActualizado
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error inesperado'
        throw error
      }
    },

    toggleFavorito(gameId: number) {
      this.error = null

      try {
        const usuarioActualizado = toggleFavoritoUsuarioActual(gameId)
        this.usuarios = obtenerUsuariosGuardados()
        this.usuarioActual = usuarioActualizado

        return usuarioActualizado
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error inesperado'
        throw error
      }
    },

    esFavorito(gameId: number) {
      return this.usuarioActual?.favoritos.includes(gameId) ?? false
    },

    obtenerFavoritos() {
      return this.usuarioActual?.favoritos ?? []
    },

    limpiarError() {
      this.error = null
    },
  },
})
