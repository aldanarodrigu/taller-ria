<script setup lang="ts">
import { computed } from 'vue'

import { useCargadorGlobalStore } from '../store/useCargadorGlobalStore'

const cargadorGlobalStore = useCargadorGlobalStore()
const estaVisible = computed(() => cargadorGlobalStore.estaVisible)
</script>

<template>
  <transition name="cargador-global">
    <div
      v-if="estaVisible"
      class="cargador-global"
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      <div class="cargador-global__contenido">
        <span class="cargador-global__anillo" />
        <p class="cargador-global__texto">Cargando...</p>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.cargador-global {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(13, 15, 20, 0.72);
  backdrop-filter: blur(6px);
  pointer-events: all;
}

.cargador-global__contenido {
  display: grid;
  justify-items: center;
  gap: 1rem;
  padding: 1.75rem 2rem;
  border: 1px solid rgba(124, 58, 237, 0.28);
  border-radius: 1.5rem;
  background:
    radial-gradient(circle at top, rgba(124, 58, 237, 0.22), transparent 55%),
    rgba(22, 27, 39, 0.96);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.38);
}

.cargador-global__anillo {
  width: 3.5rem;
  height: 3.5rem;
  border: 4px solid rgba(226, 232, 240, 0.14);
  border-top-color: var(--color-brand);
  border-right-color: var(--color-brand-alt);
  border-radius: 999px;
  animation: girar 0.85s linear infinite;
}

.cargador-global__texto {
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: 1.1rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.cargador-global-enter-active,
.cargador-global-leave-active {
  transition: opacity 0.2s ease;
}

.cargador-global-enter-from,
.cargador-global-leave-to {
  opacity: 0;
}

@keyframes girar {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
