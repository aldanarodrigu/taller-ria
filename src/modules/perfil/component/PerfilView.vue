<script setup lang="ts">
import type { PerfilItem } from '../type/perfil.types'

defineProps<{
  error: string | null
  items: PerfilItem[]
  loading: boolean
}>()

const emit = defineEmits<{
  reload: []
}>()
</script>

<template>
  <section class="perfil-module">
    <header class="perfil-module__header">
      <h1>Perfil</h1>
      <button type="button" @click="emit('reload')">Recargar</button>
    </header>

    <p v-if="loading">Cargando...</p>
    <p v-else-if="error">{{ error }}</p>
    <ul v-else class="perfil-module__list">
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </section>
</template>
