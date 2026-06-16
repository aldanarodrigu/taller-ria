<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

import VistaRegistro from '../component/VistaRegistro.vue'
import { useAutenticacion } from '../composable/useAutenticacion'
import type { DatosRegistro } from '../type/auth.types'

const router = useRouter()

const {
  cargando,
  error,
  inicializado,
  limpiarError,
  registrarse,
  usuarioActual,
} = useAutenticacion()

function redirigirSiHaySesion() {
  if (inicializado.value && usuarioActual.value) {
    void router.push('/')
  }
}

function manejarRegistro(datos: DatosRegistro) {
  try {
    registrarse(datos)
    void router.push('/')
  } catch {
    // El store ya publica el error para la vista.
  }
}

onMounted(() => {
  limpiarError()
  redirigirSiHaySesion()
})

onBeforeUnmount(() => {
  limpiarError()
})

watch([usuarioActual, inicializado], () => {
  redirigirSiHaySesion()
})
</script>

<template>
  <VistaRegistro
    :cargando="cargando"
    :error="error"
    @registrarse="manejarRegistro"
  />
</template>
