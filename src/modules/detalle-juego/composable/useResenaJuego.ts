import { computed, ref, watch } from 'vue'

import { useAutenticacion } from '@/modules/auth/composable/useAutenticacion'

export function useResenaJuego(gameId: () => number) {
  const {
    eliminarResena,
    guardarResena,
    usuarioActual,
    usuarios,
  } = useAutenticacion()

  const texto = ref('')
  const puntaje = ref<number | null>(null)
  const editando = ref(false)
  const error = ref<string | null>(null)
  const exito = ref<string | null>(null)

  const resenaGuardada = computed(() => {
    const usuario = usuarioActual.value
    // si no hay usuarios creados retornamos null
    if (!usuario) {
      return null
    }
    // si hay usuarios retornamos las reseñas para ese juego
    return usuario.resenas.find((resena) => resena.gameId === gameId()) ?? null
  })
  const resenasDelJuego = computed(() =>
    usuarios.value.flatMap((usuario) =>
      usuario.resenas
        .filter((resena) => resena.gameId === gameId())
        .map((resena) => ({
          ...resena,
          usuarioId: usuario.id,
          nickname: usuario.nickname,
          nombreVisible: usuario.perfil.nombreVisible,
          esPropia: usuario.id === usuarioActual.value?.id,
        })),
    ),
  )
  const hayResenas = computed(() => resenasDelJuego.value.length > 0)
  const tieneSesion = computed(() => Boolean(usuarioActual.value))
  const tieneResena = computed(() => Boolean(resenaGuardada.value))

  function cargarFormularioDesdeResena() {
    texto.value = resenaGuardada.value?.texto ?? ''
    puntaje.value = resenaGuardada.value?.puntaje ?? null
  }

  function iniciarEdicion() {
    cargarFormularioDesdeResena()
    editando.value = true
    error.value = null
    exito.value = null
  }

  function cancelarEdicion() {
    cargarFormularioDesdeResena()
    editando.value = false
    error.value = null
    exito.value = null
  }

  function actualizarTexto(valor: string) {
    texto.value = valor
    error.value = null
    exito.value = null
  }

  function actualizarPuntaje(valor: number | null) {
    puntaje.value = valor
    error.value = null
    exito.value = null
  }

  function guardar() {
    error.value = null
    exito.value = null

    try {
      guardarResena(gameId(), texto.value, puntaje.value)
      editando.value = false
      exito.value = 'Reseña guardada correctamente.'
      cargarFormularioDesdeResena()
    } catch (cause) {
      error.value = cause instanceof Error ? cause.message : 'No se pudo guardar la reseña.'
    }
  }

  function eliminar() {
    error.value = null
    exito.value = null

    try {
      eliminarResena(gameId())
      texto.value = ''
      puntaje.value = null
      editando.value = false
      exito.value = 'Reseña eliminada correctamente.'
    } catch (cause) {
      error.value = cause instanceof Error ? cause.message : 'No se pudo eliminar la reseña.'
    }
  }

  watch(resenaGuardada, () => {
    if (!editando.value) {
      cargarFormularioDesdeResena()
    }
  }, { immediate: true })

  return {
    actualizarPuntaje,
    actualizarTexto,
    cancelarEdicion,
    editando,
    eliminar,
    error,
    exito,
    guardar,
    hayResenas,
    iniciarEdicion,
    puntaje,
    resenaGuardada,
    resenasDelJuego,
    texto,
    tieneResena,
    tieneSesion,
  }
}
