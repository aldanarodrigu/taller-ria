<script setup lang="ts">
import PerfilView from '../component/PerfilView.vue'
import { usePerfil } from '../composable/usePerfil'

const { error, items, loading, reload } = usePerfil()
</script>

<template>
  <PerfilView
    :error="error"
    :items="items"
    :loading="loading"
    @reload="reload"
  />
</template>
