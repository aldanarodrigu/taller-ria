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

defineOptions({ inheritAttrs: false })
</script>

<template>
  <section class="game-grid" :id="$attrs.id">
    <div class="game-grid__header">
      <h2 class="game-grid__titulo">{{ title }}</h2>
      <span class="game-grid__linea" />
    </div>

    <p v-if="cargando" class="game-grid__estado">
      <span class="game-grid__spinner" />
      Cargando...
    </p>

    <div v-else class="game-grid__lista">
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
  margin: 2.5rem 0;
}

/* ── Header ── */

.game-grid__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.game-grid__titulo {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-text);
  white-space: nowrap;
  letter-spacing: 0.5px;
}

.game-grid__linea {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, var(--color-border-mid), transparent);
  border-radius: 1px;
}

/* ── Estado cargando ── */

.game-grid__estado {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  padding: 12px 0;
}

.game-grid__spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-border-mid);
  border-top-color: var(--color-brand);
  border-radius: 50%;
  animation: girar 0.7s linear infinite;
  flex-shrink: 0;
}

@keyframes girar {
  to {
    transform: rotate(360deg);
  }
}

/* ── Lista ── */

.game-grid__lista {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border-mid) transparent;
}

.game-grid__lista::-webkit-scrollbar {
  height: 4px;
}

.game-grid__lista::-webkit-scrollbar-track {
  background: transparent;
}

.game-grid__lista::-webkit-scrollbar-thumb {
  background: var(--color-border-mid);
  border-radius: 4px;
}

.game-grid__lista > * {
  flex: 0 0 185px;
  scroll-snap-align: start;
}

/* ── Responsive ── */

@media (max-width: 640px) {
  .game-grid {
    padding: 0 1rem;
  }

  .game-grid__lista > * {
    flex: 0 0 150px;
  }
}
</style>
