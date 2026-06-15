<script setup lang="ts">
import type { DatosDescripcionDetalleJuego } from '../type/detalle-juego.types'

defineProps<DatosDescripcionDetalleJuego>()
</script>

<template>
  <section class="descripcion-detalle-juego">
    <div class="descripcion-detalle-juego__encabezado">
      <h2>Descripción</h2>
      <a
        v-if="sitioWeb"
        :href="sitioWeb"
        class="descripcion-detalle-juego__enlace"
        rel="noreferrer"
        target="_blank"
      >
        Sitio oficial
      </a>
    </div>

    <p class="descripcion-detalle-juego__texto">{{ descripcion }}</p>
  </section>
</template>

<style scoped>
.descripcion-detalle-juego {
  display: grid;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
}

.descripcion-detalle-juego__encabezado {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.descripcion-detalle-juego__encabezado h2 {
  font-size: 1.1rem;
}

.descripcion-detalle-juego__enlace {
  color: #d9d2ff;
  font-weight: 600;
}

.descripcion-detalle-juego__texto {
  color: var(--color-text-muted);
  line-height: 1.75;
  white-space: pre-line;
}

@media (max-width: 640px) {
  .descripcion-detalle-juego__encabezado {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
