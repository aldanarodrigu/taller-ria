<script setup lang="ts">
import GameCard from '@/shared/components/GameCard.vue'
import type { JuegoRawg } from '../types/home.types'

const props = defineProps<{
  favoritosIds: number[]
  title: string
  juegos: JuegoRawg[]
  cargando: boolean
}>()

const emit = defineEmits<{
  toggleFavorito: [id: number]
}>()

function esFavorito(gameId: number): boolean {
  return props.favoritosIds.includes(gameId)
}
</script>

<template>
  <section class="game-grid">
    <h2 class="game-grid-title">{{ title }}</h2>

    <p v-if="cargando" class="game-grid-status">Cargando...</p>

    <div v-else class="game-grid-list">
      <GameCard
        v-for="juego in juegos"
        :key="juego.id"
        :id="juego.id"
        :nombre="juego.name"
        :imagen="juego.background_image ?? ''"
        :rating="juego.rating"
        :plataformas="juego.platforms.map((p) => p.platform.name)"
        :es-favorito="esFavorito(juego.id)"
        @toggle-favorito="emit('toggleFavorito', $event)"
      />
    </div>
  </section>
</template>

<style scoped>
.game-grid {
  padding: 0 2rem;
  margin: 2rem 0;
}

.game-grid-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.game-grid-list {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.game-grid-list > * {
  flex: 0 0 200px;
}

.game-grid-status {
  color: var(--color-text-muted);
}
</style>
