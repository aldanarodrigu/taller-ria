<script setup lang="ts">
defineProps<{
  mensaje: string
  mostrarAccion?: boolean
  textoAccion?: string
  titulo: string
}>()

const emit = defineEmits<{
  accion: []
}>()
</script>

<template>
  <section class="estado-detalle-juego">
    <h2 class="estado-detalle-juego__titulo">{{ titulo }}</h2>
    <p class="estado-detalle-juego__mensaje">{{ mensaje }}</p>

    <button
      v-if="mostrarAccion"
      type="button"
      class="estado-detalle-juego__boton"
      @click="emit('accion')"
    >
      {{ textoAccion || 'Reintentar' }}
    </button>
  </section>
</template>

<style scoped>
.estado-detalle-juego {
  display: grid;
  gap: 0.75rem;
  padding: 2rem;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  text-align: center;
}

.estado-detalle-juego__titulo {
  font-family: var(--font-display);
  font-size: 1.75rem;
  color: var(--color-text);
}

.estado-detalle-juego__mensaje {
  color: var(--color-text-muted);
  line-height: 1.6;
}

.estado-detalle-juego__boton {
  justify-self: center;
  padding: 0.75rem 1.2rem;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--color-brand), var(--color-brand-alt));
  color: #fff;
  font-weight: 700;
}
</style>
