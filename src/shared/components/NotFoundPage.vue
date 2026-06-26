<script setup lang="ts">
import { useRouter } from 'vue-router'
import Navbar from './Navbar.vue'

const router = useRouter()

const opcionesParticulas = {
  background: { color: { value: '#0d0d1a' } },
  fpsLimit: 60,
  particles: {
    number: { value: 80, density: { enable: true } },
    color: { value: ['#7c3aed', '#a855f7', '#6d28d9'] },
    links: {
      enable: true,
      color: '#7c3aed',
      distance: 130,
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.2,
      outModes: { default: 'bounce' },
    },
    opacity: { value: 0.5 },
    shape: { type: 'circle' },
    size: { value: { min: 1, max: 3 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'repulse' },
    },
    modes: {
      repulse: { distance: 100 },
    },
  },
}
</script>

<template>
  <Navbar />
  <div class="not-found">
    <vue-particles
      id="particulas-404"
      class="not-found__particulas"
      :options="opcionesParticulas"
    />

    <div class="not-found__contenido">
      <p class="not-found__codigo">404</p>
      <h1 class="not-found__titulo">Página no encontrada</h1>
      <p class="not-found__descripcion">La dirección que ingresaste no existe.</p>
      <button class="not-found__boton" @click="router.push('/')">Volver al inicio</button>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);
  background-color: #0d0d1a;
  color: #ffffff;
  overflow: hidden;
}

.not-found__particulas {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.not-found__contenido {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px;
}

.not-found__codigo {
  font-size: 7rem;
  font-weight: 800;
  color: #7c3aed;
  line-height: 1;
  margin: 0 0 16px;
  text-shadow: 0 0 40px rgba(124, 58, 237, 0.6);
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
