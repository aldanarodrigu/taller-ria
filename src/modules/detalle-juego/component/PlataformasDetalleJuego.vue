<script setup lang="ts">
import type { DatosPlataformaDetalleJuego } from '../type/detalle-juego.types'

defineProps<{
  plataformas: DatosPlataformaDetalleJuego[]
}>()
</script>

<template>
  <section class="plataformas-detalle-juego">
    <div class="plataformas-detalle-juego__encabezado">
      <h2 class="plataformas-detalle-juego__titulo">Plataformas</h2>
      <p class="plataformas-detalle-juego__cantidad">{{ plataformas.length }} disponibles</p>
    </div>

    <div v-if="plataformas.length" class="plataformas-detalle-juego__lista">
      <article
        v-for="plataforma in plataformas"
        :key="plataforma.id"
        class="plataformas-detalle-juego__tarjeta"
      >
        <h3 class="plataformas-detalle-juego__nombre">{{ plataforma.nombre }}</h3>
        <p class="plataformas-detalle-juego__fecha">{{ plataforma.fechaLanzamiento }}</p>
        <p v-if="plataforma.requisitosMinimos" class="plataformas-detalle-juego__requisito">
          <strong>Mínimos:</strong> {{ plataforma.requisitosMinimos }}
        </p>
        <p v-if="plataforma.requisitosRecomendados" class="plataformas-detalle-juego__requisito">
          <strong>Recomendados:</strong> {{ plataforma.requisitosRecomendados }}
        </p>
        <p
          v-if="!plataforma.requisitosMinimos && !plataforma.requisitosRecomendados"
          class="plataformas-detalle-juego__sin-requisitos"
        >
          Sin requisitos publicados.
        </p>
      </article>
    </div>

    <p v-else class="plataformas-detalle-juego__vacio">
      No hay plataformas informadas.
    </p>
  </section>
</template>

<style scoped>
.plataformas-detalle-juego {
  display: grid;
  gap: 16px;
}

.plataformas-detalle-juego__encabezado {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.plataformas-detalle-juego__titulo,
.plataformas-detalle-juego__nombre {
  font-size: 20px;
}

.plataformas-detalle-juego__cantidad,
.plataformas-detalle-juego__fecha,
.plataformas-detalle-juego__sin-requisitos,
.plataformas-detalle-juego__vacio {
  color: #8892a4;
}

.plataformas-detalle-juego__lista {
  display: grid;
  gap: 12px;
}

.plataformas-detalle-juego__tarjeta {
  display: grid;
  gap: 12px;
  padding: 16px;
  border: 1px solid #1e2433;
  border-radius: 16px;
  background: #161b27;
}

.plataformas-detalle-juego__requisito {
  line-height: 1.6;
}
</style>
