import { computed, onMounted } from 'vue'

import type { DatosPerfilEditable } from '@/modules/perfil/type/perfil.types'
import { useAutenticacionStore } from '../store/useAuthStore'
import type {
  CredencialesInicioSesion,
  DatosRegistro,
} from '../type/auth.types'

export function useAutenticacion() {
  const store = useAutenticacionStore()

  const usuarios = computed(() => store.usuarios)
  const usuarioActual = computed(() => store.usuarioActual)
  const cargando = computed(() => store.cargando)
  const error = computed(() => store.error)
  const inicializado = computed(() => store.inicializado)

  function hidratarSesion() {
    store.hidratarSesion()
  }

  function registrarse(datos: DatosRegistro) {
    store.registrarse(datos)
  }

  function iniciarSesion(credenciales: CredencialesInicioSesion) {
    store.iniciarSesion(credenciales)
  }

  function cerrarSesion() {
    store.cerrarSesion()
  }

  function actualizarPerfil(datos: DatosPerfilEditable) {
    return store.actualizarPerfil(datos)
  }

  function toggleFavorito(gameId: number) {
    return store.toggleFavorito(gameId)
  }

  function esFavorito(gameId: number) {
    return store.esFavorito(gameId)
  }

  const favoritos = computed(() => store.obtenerFavoritos())

  function limpiarError() {
    store.limpiarError()
  }

  onMounted(() => {
    if (!store.inicializado) {
      store.hidratarSesion()
    }
  })

  return {
    actualizarPerfil,
    cargando,
    cerrarSesion,
    error,
    esFavorito,
    favoritos,
    hidratarSesion,
    inicializado,
    iniciarSesion,
    limpiarError,
    registrarse,
    store,
    toggleFavorito,
    usuarioActual,
    usuarios,
  }
}
