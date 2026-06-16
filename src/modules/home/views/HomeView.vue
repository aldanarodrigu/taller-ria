<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useAutenticacion } from '@/modules/auth/composable/useAutenticacion'
import Navbar from '@/shared/components/Navbar.vue'
import HeroBanner from '@/modules/home/components/Banner.vue'
import GameGrid from '@/modules/home/components/GameGrid.vue'
import { useHome } from '../composable/useHome'

const router = useRouter()
const { favoritos, toggleFavorito, usuarioActual } = useAutenticacion()
const { juegosPopulares, juegosNuevos, cargando, error } = useHome()

function manejarToggleFavorito(gameId: number) {
  if (!usuarioActual.value) {
    void router.push('/iniciar-sesion')
    return
  }

  toggleFavorito(gameId)
}
</script>

<template>
  <section class="home-module">
    <Navbar />
    <HeroBanner />

    <p v-if="error" class="home-module__error">{{ error }}</p>

    <GameGrid
      title="Juegos populares"
      :juegos="juegosPopulares"
      :cargando="cargando"
      :favoritos-ids="favoritos"
      @toggle-favorito="manejarToggleFavorito"
    />
    <GameGrid
      title="Novedades"
      :juegos="juegosNuevos"
      :cargando="cargando"
      :favoritos-ids="favoritos"
      @toggle-favorito="manejarToggleFavorito"
    />
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
