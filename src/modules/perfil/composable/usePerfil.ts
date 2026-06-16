import { computed, onMounted } from 'vue'

import { usePerfilStore } from '../store/usePerfilStore'
import type { DatosPerfilEditable } from '../type/perfil.types'

export function usePerfil() {
  const store = usePerfilStore()

  const perfil = computed(() => store.perfil)
  const borrador = computed(() => store.borrador)
  const cargando = computed(() => store.cargando)
  const guardando = computed(() => store.guardando)
  const error = computed(() => store.error)
  const exito = computed(() => store.exito)

  function hidratarPerfil() {
    store.hidratarPerfil()
  }

  function actualizarBorrador(cambios: Partial<DatosPerfilEditable>) {
    store.actualizarBorrador(cambios)
  }

  function guardarPerfil() {
    store.guardarPerfil()
  }

  function limpiarMensajes() {
    store.limpiarMensajes()
  }

  function restablecerBorrador() {
    store.restablecerBorrador()
  }

  onMounted(() => {
    store.hidratarPerfil()
  })

  return {
    actualizarBorrador,
    borrador,
    cargando,
    error,
    exito,
    guardarPerfil,
    guardando,
    hidratarPerfil,
    limpiarMensajes,
    perfil,
    restablecerBorrador,
    store,
  }
}
