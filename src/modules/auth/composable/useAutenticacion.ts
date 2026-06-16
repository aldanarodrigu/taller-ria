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
    hidratarSesion,
    inicializado,
    iniciarSesion,
    limpiarError,
    registrarse,
    store,
    usuarioActual,
    usuarios,
  }
}
