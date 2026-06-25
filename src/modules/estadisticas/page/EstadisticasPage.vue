<script setup lang="ts">
import EstadisticasView from '../component/EstadisticasView.vue'
import { useEstadisticas } from '../composable/useEstadisticas'

const { error, items, loading, reload } = useEstadisticas()
</script>

<template>
  <EstadisticasView
    :error="error"
    :items="items"
    :loading="loading"
    @reload="reload"
  />
</template>
