<script setup lang="ts">
import type { DatosPerfilEditable } from '../type/perfil.types'

defineProps<{
  borrador: DatosPerfilEditable
  cargando: boolean
  error: string | null
  exito: string | null
  guardando: boolean
  perfil: DatosPerfilEditable | null
}>()

const emit = defineEmits<{
  recargar: []
}>()
</script>

<template>
  <section class="perfil-module">
    <header class="perfil-module__header">
      <h1>Perfil</h1>
      <button type="button" @click="emit('recargar')">Recargar</button>
    </header>

    <p v-if="cargando">Cargando...</p>
    <p v-else-if="error">{{ error }}</p>
    <div v-else class="perfil-module__resumen">
      <p>Nombre visible actual: {{ perfil?.nombreVisible || 'Sin completar' }}</p>
      <p>Correo actual: {{ perfil?.correo || 'Sin completar' }}</p>
      <p>Borrador nombre: {{ borrador.nombreVisible || 'Sin completar' }}</p>
      <p>Borrador correo: {{ borrador.correo || 'Sin completar' }}</p>
      <p v-if="guardando">Guardando cambios...</p>
      <p v-if="exito">{{ exito }}</p>
    </div>
  </section>
</template>
