<script setup lang="ts">
import FavoritosView from '../component/FavoritosView.vue'
import { useFavoritos } from '../composable/useFavoritos'

const { error, items, loading, reload } = useFavoritos()
</script>

<template>
  <FavoritosView
    :error="error"
    :items="items"
    :loading="loading"
    @reload="reload"
  />
</template>
