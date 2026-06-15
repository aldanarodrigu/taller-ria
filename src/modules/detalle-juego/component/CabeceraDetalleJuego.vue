<script setup lang="ts">
import type { DatosCabeceraDetalleJuego } from '../type/detalle-juego.types'

defineProps<DatosCabeceraDetalleJuego>()
</script>

<template>
  <section class="cabecera-detalle-juego">
    <div class="cabecera-detalle-juego__texto">
      <p class="cabecera-detalle-juego__eyebrow">Detalle del juego</p>
      <h1 class="cabecera-detalle-juego__titulo">{{ titulo }}</h1>
      <p v-if="tituloOriginal && tituloOriginal !== titulo" class="cabecera-detalle-juego__subtitulo">
        Título original: {{ tituloOriginal }}
      </p>
    </div>

    <div class="cabecera-detalle-juego__imagenes">
      <img
        v-if="imagenPrincipal"
        class="cabecera-detalle-juego__imagen cabecera-detalle-juego__imagen--principal"
        :src="imagenPrincipal"
        :alt="titulo"
      />
      <img
        v-if="imagenSecundaria"
        class="cabecera-detalle-juego__imagen cabecera-detalle-juego__imagen--secundaria"
        :src="imagenSecundaria"
        :alt="`${titulo} captura destacada`"
      />
    </div>
  </section>
</template>

<style scoped>
.cabecera-detalle-juego {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  gap: 1.5rem;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 1.5rem;
  background:
    radial-gradient(circle at top left, rgba(124, 58, 237, 0.18), transparent 45%),
    linear-gradient(180deg, rgba(22, 27, 39, 0.95), rgba(13, 15, 20, 0.98));
}

.cabecera-detalle-juego__texto {
  display: grid;
  align-content: center;
  gap: 0.75rem;
}

.cabecera-detalle-juego__eyebrow {
  color: #b8c1d8;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.8rem;
}

.cabecera-detalle-juego__titulo {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5vw, 4.5rem);
  line-height: 0.92;
}

.cabecera-detalle-juego__subtitulo {
  color: var(--color-text-muted);
  font-size: 1rem;
}

.cabecera-detalle-juego__imagenes {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 0.75rem;
  min-height: 280px;
}

.cabecera-detalle-juego__imagen {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.cabecera-detalle-juego__imagen--secundaria {
  align-self: end;
  min-height: 75%;
}

@media (max-width: 900px) {
  .cabecera-detalle-juego {
    grid-template-columns: 1fr;
  }

  .cabecera-detalle-juego__imagenes {
    grid-template-columns: 1fr 1fr;
    min-height: auto;
  }
}

@media (max-width: 640px) {
  .cabecera-detalle-juego {
    padding: 1rem;
  }

  .cabecera-detalle-juego__imagenes {
    grid-template-columns: 1fr;
  }

  .cabecera-detalle-juego__imagen--secundaria {
    min-height: 200px;
  }
}
</style>
