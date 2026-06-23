<script setup lang="ts">
import type { DatosDescripcionDetalleJuego } from '../type/detalle-juego.types'

defineProps<DatosDescripcionDetalleJuego>()
</script>

<template>
  <section class="descripcion-detalle-juego">
    <div class="descripcion-detalle-juego__encabezado">
      <h2 class="descripcion-detalle-juego__titulo">Descripción</h2>
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
  gap: 16px;
  padding: 20px;
  border: 1px solid #1e2433;
  border-radius: 16px;
  background: #161b27;
}

.descripcion-detalle-juego__encabezado {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.descripcion-detalle-juego__titulo {
  font-size: 20px;
}

.descripcion-detalle-juego__enlace {
  color: #d9d2ff;
  font-weight: 600;
}

.descripcion-detalle-juego__texto {
  color: #8892a4;
  line-height: 1.7;
  white-space: pre-line;
}

@media (max-width: 640px) {
  .descripcion-detalle-juego__encabezado {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
