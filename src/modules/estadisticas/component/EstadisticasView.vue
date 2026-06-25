<script setup lang="ts">
import type { EstadisticasItem } from '../type/estadisticas.types'

defineProps<{
  error: string | null
  items: EstadisticasItem[]
  loading: boolean
}>()

const emit = defineEmits<{
  reload: []
}>()
</script>

<template>
  <section class="estadisticas-module">
    <header class="estadisticas-module__header">
      <h1>Estadisticas</h1>
      <button type="button" @click="emit('reload')">Recargar</button>
    </header>

    <p v-if="loading">Cargando...</p>
    <p v-else-if="error">{{ error }}</p>
    <ul v-else class="estadisticas-module__list">
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </section>
</template>
