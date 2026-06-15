<script setup lang="ts">
import DetalleJuegoView from '../component/DetalleJuegoView.vue'
import { useDetalleJuego } from '../composable/useDetalleJuego'

const { error, item, loading, reload } = useDetalleJuego()
</script>

<template>
  <DetalleJuegoView
    :error="error"
    :item="item"
    :loading="loading"
    @reload="reload"
  />
</template>
