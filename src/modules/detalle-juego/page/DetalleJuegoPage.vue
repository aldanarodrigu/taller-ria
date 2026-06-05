<script setup lang="ts">
import DetalleJuegoView from '../component/DetalleJuegoView.vue'
import { useDetalleJuego } from '../composable/useDetalleJuego'

const { error, items, loading, reload } = useDetalleJuego()
</script>

<template>
  <DetalleJuegoView
    :error="error"
    :items="items"
    :loading="loading"
    @reload="reload"
  />
</template>
