<script setup lang="ts">
import AuthView from '../component/AuthView.vue'
import { useAuth } from '../composable/useAuth'

const { error, items, loading, reload } = useAuth()
</script>

<template>
  <AuthView
    :error="error"
    :items="items"
    :loading="loading"
    @reload="reload"
  />
</template>
