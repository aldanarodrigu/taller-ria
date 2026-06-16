<script setup lang="ts">
import AuthView from '../component/AuthView.vue'
import { useAutenticacion } from '../composable/useAuth'

const { cargando, error, usuarioActual, usuarios } = useAutenticacion()
</script>

<template>
  <AuthView
    :cargando="cargando"
    :error="error"
    :usuario-actual="usuarioActual"
    :usuarios="usuarios"
  />
</template>
