<script setup lang="ts">
import { useDetalleJuego } from '../composable/useDetalleJuego'

const { items, loading, error, reload } = useDetalleJuego()
</script>

<template>
  <section class="detalle-juego-module">
    <header class="detalle-juego-module__header">
      <h1>DetalleJuego</h1>
      <button type="button" @click="reload">Recargar</button>
    </header>

    <p v-if="loading">Cargando...</p>
    <p v-else-if="error">{{ error }}</p>
    <ul v-else class="detalle-juego-module__list">
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </section>
</template>
