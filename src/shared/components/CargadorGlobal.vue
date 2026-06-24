<script setup lang="ts">
import { computed } from 'vue'

import { useCargadorGlobalStore } from '../store/useCargadorGlobalStore'

const cargadorGlobalStore = useCargadorGlobalStore()
const estaVisible = computed(() => cargadorGlobalStore.estaVisible)
</script>

<template>
  <div
    v-if="estaVisible"
    class="cargador-global"
    aria-busy="true"
    aria-live="polite"
    role="status"
  >
    <div class="cargador-global__contenido">
      <p class="cargador-global__texto">Cargando...</p>
    </div>
  </div>
</template>

<style scoped>
.cargador-global {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0d0f14;
  pointer-events: all;
}

.cargador-global__contenido {
  padding: 24px 32px;
  border: 1px solid #1e2433;
  border-radius: 16px;
  background: #161b27;
  text-align: center;
}

.cargador-global__texto {
  color: #e2e8f0;
  font-size: 18px;
  font-weight: 700;
}
</style>
