<script setup lang="ts">
import type { DatosTiendaDetalleJuego } from '../type/detalle-juego.types'

defineProps<{
  tiendas: DatosTiendaDetalleJuego[]
}>()
</script>

<template>
  <section class="tiendas-detalle-juego">
    <div class="tiendas-detalle-juego__encabezado">
      <h2 class="tiendas-detalle-juego__titulo">Tiendas</h2>
      <p class="tiendas-detalle-juego__cantidad">{{ tiendas.length }} disponibles</p>
    </div>

    <div v-if="tiendas.length" class="tiendas-detalle-juego__lista">
      <article
        v-for="tienda in tiendas"
        :key="tienda.id"
        class="tiendas-detalle-juego__tarjeta"
      >
        <h3 class="tiendas-detalle-juego__nombre">{{ tienda.nombre }}</h3>
        <p class="tiendas-detalle-juego__dominio">{{ tienda.dominio }}</p>
        <a
          v-if="tienda.enlace"
          :href="tienda.enlace"
          class="tiendas-detalle-juego__link"
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
  gap: 16px;
}

.tiendas-detalle-juego__encabezado {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.tiendas-detalle-juego__titulo,
.tiendas-detalle-juego__nombre {
  font-size: 20px;
}

.tiendas-detalle-juego__cantidad,
.tiendas-detalle-juego__dominio,
.tiendas-detalle-juego__vacio {
  color: #8892a4;
}

.tiendas-detalle-juego__lista {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
}

.tiendas-detalle-juego__tarjeta {
  display: grid;
  gap: 8px;
  padding: 16px;
  border: 1px solid #1e2433;
  border-radius: 16px;
  background: #161b27;
}

.tiendas-detalle-juego__link {
  color: #d9d2ff;
  font-weight: 600;
}

@media (max-width: 720px) {
  .tiendas-detalle-juego__lista {
    grid-template-columns: 1fr;
  }
}
</style>
