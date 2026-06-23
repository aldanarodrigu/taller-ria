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
        <h2 class="resumen-detalle-juego__titulo">Desarrolladoras</h2>
        <ul class="resumen-detalle-juego__lista">
          <li
            v-for="desarrolladora in desarrolladoras"
            :key="desarrolladora"
            class="resumen-detalle-juego__item"
          >
            {{ desarrolladora }}
          </li>
        </ul>
      </article>

      <article class="resumen-detalle-juego__bloque">
        <h2 class="resumen-detalle-juego__titulo">Géneros</h2>
        <ul class="resumen-detalle-juego__lista">
          <li
            v-for="genero in generos"
            :key="genero"
            class="resumen-detalle-juego__item"
          >
            {{ genero }}
          </li>
        </ul>
      </article>

      <article class="resumen-detalle-juego__bloque">
        <h2 class="resumen-detalle-juego__titulo">Etiquetas</h2>
        <ul class="resumen-detalle-juego__lista">
          <li
            v-for="etiqueta in etiquetas"
            :key="etiqueta"
            class="resumen-detalle-juego__item"
          >
            {{ etiqueta }}
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style scoped>
.resumen-detalle-juego {
  display: grid;
  gap: 16px;
}

.resumen-detalle-juego__datos {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 12px;
}

.resumen-detalle-juego__tarjeta,
.resumen-detalle-juego__bloque {
  padding: 16px;
  border: 1px solid #1e2433;
  border-radius: 16px;
  background: #161b27;
}

.resumen-detalle-juego__etiqueta {
  color: #8892a4;
  font-size: 13px;
}

.resumen-detalle-juego__valor {
  margin-top: 6px;
  font-size: 24px;
}

.resumen-detalle-juego__bloques {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
}

.resumen-detalle-juego__titulo {
  margin-bottom: 12px;
  font-size: 20px;
}

.resumen-detalle-juego__lista {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.resumen-detalle-juego__item {
  padding: 6px 10px;
  border: 1px solid #2d3548;
  border-radius: 10px;
  color: #d9d2ff;
  font-size: 14px;
}

@media (max-width: 720px) {
  .resumen-detalle-juego__datos,
  .resumen-detalle-juego__bloques {
    grid-template-columns: 1fr;
  }
}
</style>
