<script setup lang="ts">
import type { AuthItem } from '../type/auth.types'

defineProps<{
  error: string | null
  items: AuthItem[]
  loading: boolean
}>()

const emit = defineEmits<{
  reload: []
}>()
</script>

<template>
  <section class="auth-module">
    <header class="auth-module__header">
      <h1>Auth</h1>
      <button type="button" @click="emit('reload')">Recargar</button>
    </header>

    <p v-if="loading">Cargando...</p>
    <p v-else-if="error">{{ error }}</p>
    <ul v-else class="auth-module__list">
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </section>
</template>
