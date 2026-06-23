<script setup lang="ts">
defineProps<{
  mensaje: string
  mostrarAccion?: boolean
  textoAccion?: string
  titulo: string
}>()

const emit = defineEmits<{
  accion: []
}>()
</script>

<template>
  <section class="estado-detalle-juego">
    <h2 class="estado-detalle-juego__titulo">{{ titulo }}</h2>
    <p class="estado-detalle-juego__mensaje">{{ mensaje }}</p>

    <button
      v-if="mostrarAccion"
      type="button"
      class="estado-detalle-juego__boton"
      @click="emit('accion')"
    >
      {{ textoAccion || 'Reintentar' }}
    </button>
  </section>
</template>

<style scoped>
.estado-detalle-juego {
  display: grid;
  gap: 12px;
  padding: 32px;
  border: 1px solid #1e2433;
  border-radius: 16px;
  background: #161b27;
  text-align: center;
}

.estado-detalle-juego__titulo {
  color: #e2e8f0;
  font-size: 28px;
}

.estado-detalle-juego__mensaje {
  color: #8892a4;
  line-height: 1.6;
}

.estado-detalle-juego__boton {
  justify-self: center;
  padding: 12px 16px;
  border-radius: 10px;
  background: #7c3aed;
  color: #fff;
  font-weight: 700;
}
</style>
