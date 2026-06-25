<script setup lang="ts">
import Navbar from '@/shared/components/Navbar.vue';
import EstadisticasView from '../component/EstadisticasView.vue'
import { useEstadisticas } from '../composable/useEstadisticas'
import { useRouter } from 'vue-router';

const router = useRouter()
const { error, generos, loading, reload } = useEstadisticas()


function manejarVolver() {
  if (window.history.length > 1) {
    router.back()
    return
  }

  void router.push('/')
}


</script>

<template>
  <Navbar />

  <EstadisticasView
    :error="error"
    :generos="generos"
    :loading="loading"
    @back="manejarVolver"
  />
</template>
