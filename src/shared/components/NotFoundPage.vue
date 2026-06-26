<script setup lang="ts">
import { useRouter } from 'vue-router'
import Navbar from './Navbar.vue'

const router = useRouter()
</script>

<template>
  <Navbar />
  <div class="not-found">
    <p class="not-found__codigo">404</p>
    <h1 class="not-found__titulo">Página no encontrada</h1>
    <p class="not-found__descripcion">La dirección que ingresaste no existe.</p>
    <button class="not-found__boton" @click="router.push('/')">Volver al inicio</button>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);
  background-color: #0d0d1a;
  color: #ffffff;
  text-align: center;
  padding: 24px;
}

.not-found__codigo {
  font-size: 7rem;
  font-weight: 800;
  color: #7c3aed;
  line-height: 1;
  margin: 0 0 16px;
}

.not-found__titulo {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 8px;
}

.not-found__descripcion {
  font-size: 0.95rem;
  color: #a0a0c0;
  margin: 0 0 32px;
}

.not-found__boton {
  background-color: #7c3aed;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}

.not-found__boton:hover {
  background-color: #6d28d9;
}
</style>
