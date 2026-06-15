<script setup lang="ts">
import type { DatosTiendaDetalleJuego } from '../type/detalle-juego.types'

defineProps<{
  tiendas: DatosTiendaDetalleJuego[]
}>()
</script>

<template>
  <section class="tiendas-detalle-juego">
    <div class="tiendas-detalle-juego__encabezado">
      <h2>Tiendas</h2>
      <p>{{ tiendas.length }} disponibles</p>
    </div>

    <div v-if="tiendas.length" class="tiendas-detalle-juego__lista">
      <article
        v-for="tienda in tiendas"
        :key="tienda.id"
        class="tiendas-detalle-juego__tarjeta"
      >
        <h3>{{ tienda.nombre }}</h3>
        <p>{{ tienda.dominio }}</p>
        <a
          v-if="tienda.enlace"
          :href="tienda.enlace"
          rel="noreferrer"
          target="_blank"
        >
          Ver tienda
        </a>
      </article>
    </div>

    <p v-else class="tiendas-detalle-juego__vacio">No hay tiendas informadas.</p>
  </section>
</template>

<style scoped>
.tiendas-detalle-juego {
  display: grid;
  gap: 1rem;
}

.tiendas-detalle-juego__encabezado {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.tiendas-detalle-juego__encabezado p,
.tiendas-detalle-juego__tarjeta p,
.tiendas-detalle-juego__vacio {
  color: var(--color-text-muted);
}

.tiendas-detalle-juego__lista {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
}

.tiendas-detalle-juego__tarjeta {
  display: grid;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
}

.tiendas-detalle-juego__tarjeta a {
  color: #d9d2ff;
  font-weight: 600;
}
</style>
