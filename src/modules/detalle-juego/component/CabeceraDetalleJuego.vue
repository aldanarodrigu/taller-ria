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
  grid-template-columns: 1fr 420px;
  gap: 24px;
  padding: 24px;
  border: 1px solid #1e2433;
  border-radius: 16px;
  background: #161b27;
}

.cabecera-detalle-juego__texto {
  display: grid;
  align-content: center;
  gap: 12px;
}

.cabecera-detalle-juego__eyebrow {
  color: #8892a4;
  font-size: 13px;
}

.cabecera-detalle-juego__titulo {
  font-size: 48px;
  line-height: 1;
}

.cabecera-detalle-juego__subtitulo {
  color: #8892a4;
  font-size: 16px;
}

.cabecera-detalle-juego__imagenes {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;
}

.cabecera-detalle-juego__imagen {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border: 1px solid #2d3548;
  border-radius: 12px;
}

.cabecera-detalle-juego__imagen--secundaria {
  align-self: end;
  height: 220px;
}

@media (max-width: 900px) {
  .cabecera-detalle-juego {
    grid-template-columns: 1fr;
  }

  .cabecera-detalle-juego__imagenes {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .cabecera-detalle-juego {
    padding: 16px;
  }

  .cabecera-detalle-juego__imagenes {
    grid-template-columns: 1fr;
  }

  .cabecera-detalle-juego__imagen--secundaria {
    height: 200px;
  }
}
</style>
