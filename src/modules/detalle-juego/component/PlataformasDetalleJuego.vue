<script setup lang="ts">
import type { DatosPlataformaDetalleJuego } from '../type/detalle-juego.types'

defineProps<{
  plataformas: DatosPlataformaDetalleJuego[]
}>()
</script>

<template>
  <section class="plataformas-detalle-juego">
    <div class="plataformas-detalle-juego__encabezado">
      <h2>Plataformas</h2>
      <p>{{ plataformas.length }} disponibles</p>
    </div>

    <div v-if="plataformas.length" class="plataformas-detalle-juego__lista">
      <article
        v-for="plataforma in plataformas"
        :key="plataforma.id"
        class="plataformas-detalle-juego__tarjeta"
      >
        <h3>{{ plataforma.nombre }}</h3>
        <p class="plataformas-detalle-juego__fecha">{{ plataforma.fechaLanzamiento }}</p>
        <p v-if="plataforma.requisitosMinimos">
          <strong>Mínimos:</strong> {{ plataforma.requisitosMinimos }}
        </p>
        <p v-if="plataforma.requisitosRecomendados">
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
  gap: 1rem;
}

.plataformas-detalle-juego__encabezado {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.plataformas-detalle-juego__encabezado p,
.plataformas-detalle-juego__fecha,
.plataformas-detalle-juego__sin-requisitos,
.plataformas-detalle-juego__vacio {
  color: var(--color-text-muted);
}

.plataformas-detalle-juego__lista {
  display: grid;
  gap: 0.75rem;
}

.plataformas-detalle-juego__tarjeta {
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
}

.plataformas-detalle-juego__tarjeta h3 {
  font-size: 1rem;
}

.plataformas-detalle-juego__tarjeta p {
  line-height: 1.6;
}
</style>
