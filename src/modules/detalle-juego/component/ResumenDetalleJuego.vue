<script setup lang="ts">
import type { DatosResumenDetalleJuego } from '../type/detalle-juego.types'

defineProps<DatosResumenDetalleJuego>()
</script>

<template>
  <section class="resumen-detalle-juego">
    <div class="resumen-detalle-juego__datos">
      <article
        v-for="dato in datosDestacados"
        :key="dato.etiqueta"
        class="resumen-detalle-juego__tarjeta"
      >
        <p class="resumen-detalle-juego__etiqueta">{{ dato.etiqueta }}</p>
        <p class="resumen-detalle-juego__valor">{{ dato.valor }}</p>
      </article>
    </div>

    <div class="resumen-detalle-juego__bloques">
      <article class="resumen-detalle-juego__bloque">
        <h2>Desarrolladoras</h2>
        <ul>
          <li v-for="desarrolladora in desarrolladoras" :key="desarrolladora">{{ desarrolladora }}</li>
        </ul>
      </article>

      <article class="resumen-detalle-juego__bloque">
        <h2>Géneros</h2>
        <ul>
          <li v-for="genero in generos" :key="genero">{{ genero }}</li>
        </ul>
      </article>

      <article class="resumen-detalle-juego__bloque">
        <h2>Etiquetas</h2>
        <ul>
          <li v-for="etiqueta in etiquetas" :key="etiqueta">{{ etiqueta }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style scoped>
.resumen-detalle-juego {
  display: grid;
  gap: 1rem;
}

.resumen-detalle-juego__datos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
}

.resumen-detalle-juego__tarjeta,
.resumen-detalle-juego__bloque {
  padding: 1rem;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
}

.resumen-detalle-juego__etiqueta {
  color: var(--color-text-muted);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.resumen-detalle-juego__valor {
  margin-top: 0.35rem;
  font-family: var(--font-display);
  font-size: 1.5rem;
}

.resumen-detalle-juego__bloques {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.resumen-detalle-juego__bloque h2 {
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.resumen-detalle-juego__bloque ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.resumen-detalle-juego__bloque li {
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(124, 58, 237, 0.16);
  color: #d9d2ff;
  font-size: 0.88rem;
}
</style>
