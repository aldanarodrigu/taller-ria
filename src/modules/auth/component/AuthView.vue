<script setup lang="ts">
import type { UsuarioLocal } from '../type/auth.types'

defineProps<{
  cargando: boolean
  error: string | null
  usuarioActual: UsuarioLocal | null
  usuarios: UsuarioLocal[]
}>()
</script>

<template>
  <section class="auth-module">
    <header class="auth-module__header">
      <h1>Auth</h1>
    </header>

    <p v-if="cargando">Cargando...</p>
    <p v-else-if="error">{{ error }}</p>
    <div v-else class="auth-module__resumen">
      <p v-if="usuarioActual">Sesion activa: {{ usuarioActual.nickname }}</p>
      <p v-else>Sin sesion activa.</p>
      <p>Usuarios guardados: {{ usuarios.length }}</p>
    </div>
  </section>
</template>
