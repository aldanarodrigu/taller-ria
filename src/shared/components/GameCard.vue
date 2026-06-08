<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  id: number
  nombre: string
  imagen: string
  rating: number
  plataformas: string[]
  esFavorito: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ toggleFavorito: [id: number] }>()
const router = useRouter()

// máx 3 plataformas visibles
const plataformasVisibles = computed(() => props.plataformas.slice(0, 3))

// array de booleanos para renderizar estrellas llenas/vacías
const estrellas = computed(() =>
  Array.from({ length: 5 }, (_, i) => i < Math.round(props.rating))
)

function irAlDetalle() {
  router.push(`/games/${props.id}`)
}

function onToggleFavorito(evento: MouseEvent) {
  evento.stopPropagation()
  emit('toggleFavorito', props.id)
}
</script>

<template>
  <article
    class="game-card"
    :class="{ 'game-card--favorito': esFavorito }"
    @click="irAlDetalle"
  >
    <div class="game-card__imagen-wrapper">
      <img
        class="game-card__imagen"
        :src="imagen"
        :alt="nombre"
      />
      <button
        class="game-card__favorito"
        :aria-label="esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'"
        @click="onToggleFavorito"
      >
        {{ esFavorito ? '♥' : '♡' }}
      </button>
    </div>

    <div class="game-card__info">
      <h3 class="game-card__nombre">{{ nombre }}</h3>

      <div class="game-card__rating">
        <span
          v-for="(llena, i) in estrellas"
          :key="i"
          class="game-card__estrella"
          :class="{ 'game-card__estrella--llena': llena }"
        >★</span>
      </div>

      <div class="game-card__plataformas">
        <span
          v-for="plataforma in plataformasVisibles"
          :key="plataforma"
          class="game-card__plataforma-badge"
        >
          {{ plataforma }}
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.game-card {
  background-color: #1a1a2e;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
}

.game-card__imagen-wrapper {
  position: relative;
  aspect-ratio: 3 / 4;
}

.game-card__imagen {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.game-card__favorito {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-card--favorito .game-card__favorito {
  color: #7c3aed;
}

.game-card__info {
  padding: 10px 12px 12px;
}

.game-card__nombre {
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0 0 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.game-card__rating {
  display: flex;
  gap: 2px;
  margin-bottom: 6px;
}

.game-card__estrella {
  font-size: 0.75rem;
  color: #4a4a6a;
}

.game-card__estrella--llena {
  color: #f59e0b;
}

.game-card__plataformas {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.game-card__plataforma-badge {
  font-size: 0.65rem;
  color: #a0a0c0;
  background: #2a2a4a;
  border-radius: 4px;
  padding: 2px 6px;
}
</style>
