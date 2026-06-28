<script setup lang="ts">
import { computed } from 'vue'

import ResenaTarjeta from '@/shared/components/ResenaTarjeta.vue'
import type { ResenaJuegoLocal } from '@/modules/auth/type/auth.types'

const props = defineProps<{
  resenas: ResenaJuegoLocal[]
}>()

const emit = defineEmits<{
  seleccionar: [id: number]
}>()

const resenasOrdenadas = computed(() =>
  [...props.resenas].sort(
    (primera, segunda) =>
      new Date(segunda.fechaActualizacion).getTime() - new Date(primera.fechaActualizacion).getTime(),
  ),
)

function obtenerTitulo(resena: ResenaJuegoLocal): string {
  return resena.tituloJuego || `Juego #${resena.gameId}`
}
</script>

<template>
  <section class="resenas-perfil">
    <header class="resenas-perfil__encabezado">
      <h2 class="resenas-perfil__titulo">Mis reseñas</h2>
      <p class="resenas-perfil__descripcion">Tus opiniones guardadas desde el detalle de cada juego.</p>
    </header>

    <div v-if="resenasOrdenadas.length" class="resenas-perfil__lista">
      <ResenaTarjeta
        v-for="resena in resenasOrdenadas"
        :key="resena.gameId"
        :fecha-actualizacion="resena.fechaActualizacion"
        :puntaje="resena.puntaje"
        :seleccionable="true"
        :texto="resena.texto"
        :titulo-juego="obtenerTitulo(resena)"
        @seleccionar="emit('seleccionar', resena.gameId)"
      />
    </div>

    <div v-else class="resenas-perfil__vacio">
      <p class="resenas-perfil__vacio-titulo">Todavia no escribiste reseñas</p>
      <p class="resenas-perfil__vacio-texto">Cuando escribas una reseña, va a aparecer en esta seccion.</p>
    </div>
  </section>
</template>

<style scoped>
.resenas-perfil {
  display: grid;
  gap: 16px;
}

.resenas-perfil__encabezado,
.resenas-perfil__lista,
.resenas-perfil__vacio {
  display: grid;
  gap: 12px;
}

.resenas-perfil__titulo {
  margin: 0;
  color: #e2e8f0;
  font-size: 24px;
}

.resenas-perfil__descripcion,
.resenas-perfil__vacio-texto {
  margin: 0;
  color: #8892a4;
  line-height: 1.5;
}

.resenas-perfil__vacio {
  padding: 16px;
  border: 1px solid #1e2433;
  border-radius: 8px;
  background: #0d0f14;
}

.resenas-perfil__vacio-titulo {
  margin: 0;
  color: #e2e8f0;
  font-size: 16px;
  font-weight: 700;
}
</style>
