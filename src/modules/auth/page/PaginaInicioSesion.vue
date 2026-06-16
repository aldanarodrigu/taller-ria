<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

import VistaInicioSesion from '../component/VistaInicioSesion.vue'
import { useAutenticacion } from '../composable/useAutenticacion'
import type { CredencialesInicioSesion } from '../type/auth.types'

const router = useRouter()

const {
  cargando,
  error,
  inicializado,
  iniciarSesion,
  limpiarError,
  usuarioActual,
} = useAutenticacion()

function redirigirSiHaySesion() {
  if (inicializado.value && usuarioActual.value) {
    void router.push('/')
  }
}

function manejarInicioSesion(credenciales: CredencialesInicioSesion) {
  try {
    iniciarSesion(credenciales)
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
  <VistaInicioSesion
    :cargando="cargando"
    :error="error"
    @iniciar-sesion="manejarInicioSesion"
  />
</template>
