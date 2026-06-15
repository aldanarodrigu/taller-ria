<script setup lang="ts">
import Navbar from '@/shared/components/Navbar.vue'
import HeroBanner from '@/modules/home/components/Banner.vue'
import GameGrid from '@/modules/home/components/GameGrid.vue'
import { useHome } from '../composable/useHome'

const { juegosPopulares, juegosNuevos, cargando, error } = useHome()
</script>

<template>
  <section class="home-module">
    <Navbar />
    <HeroBanner />

    <p v-if="error" class="home-module__error">{{ error }}</p>

    <GameGrid title="Juegos populares" :juegos="juegosPopulares" :cargando="cargando" />
    <GameGrid title="Novedades" :juegos="juegosNuevos" :cargando="cargando" />
  </section>
</template>

<style scoped>
.home-module {
  width: 100%;
  min-height: 100vh;
  background: #0d0f14;
  overflow-x: hidden;
}

.home-module__error {
  padding: 1rem 2rem;
  color: #f87171;
}
</style>
