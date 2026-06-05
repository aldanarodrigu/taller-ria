<script setup lang="ts">
import type { FavoritosItem } from '../type/favoritos.types'

defineProps<{
  error: string | null
  items: FavoritosItem[]
  loading: boolean
}>()

const emit = defineEmits<{
  reload: []
}>()
</script>

<template>
  <section class="favoritos-module">
    <header class="favoritos-module__header">
      <h1>Favoritos</h1>
      <button type="button" @click="emit('reload')">Recargar</button>
    </header>

    <p v-if="loading">Cargando...</p>
    <p v-else-if="error">{{ error }}</p>
    <ul v-else class="favoritos-module__list">
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </section>
</template>
