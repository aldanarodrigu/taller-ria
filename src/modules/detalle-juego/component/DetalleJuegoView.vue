<script setup lang="ts">
import type { DetalleJuego } from '../type/detalle-juego.types'

defineProps<{
  error: string | null
  item: DetalleJuego | null
  loading: boolean
}>()

const emit = defineEmits<{
  reload: []
}>()
</script>

<template>
  <section class="detalle-juego-module">
    <header class="detalle-juego-module__header">
      <h1>DetalleJuego</h1>
      <button type="button" @click="emit('reload')">Recargar</button>
    </header>

    <p v-if="loading">Cargando...</p>
    <p v-else-if="error">{{ error }}</p>
    <article v-else-if="item" class="detalle-juego-module__content">
      <h2>{{ item.name }}</h2>
      <p>ID: {{ item.id }}</p>
      <p>Lanzamiento: {{ item.released || 'Sin fecha' }}</p>
      <p>Rating: {{ item.rating }}</p>
    </article>
    <p v-else>No se encontró información del juego.</p>
  </section>
</template>
