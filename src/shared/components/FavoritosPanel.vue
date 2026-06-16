<script setup lang="ts">
import type { JuegoFavoritoResumen } from '../type/favoritos.types'

withDefaults(defineProps<{
  descripcion?: string
  emptyDescription?: string
  emptyTitle?: string
  error: string | null
  items: JuegoFavoritoResumen[]
  loading: boolean
  mostrarRecargar?: boolean
  skeletonCount?: number
  titulo?: string
}>(), {
  descripcion: '',
  emptyDescription: 'Todavia no agregaste juegos a tu lista.',
  emptyTitle: 'No tienes favoritos guardados',
  mostrarRecargar: false,
  skeletonCount: 4,
  titulo: '',
})

const emit = defineEmits<{
  recargar: []
  seleccionar: [id: number]
  toggleFavorito: [id: number]
}>()

function formatearFecha(fecha: string): string {
  if (!fecha) {
    return 'Fecha sin confirmar'
  }

  const fechaConvertida = new Date(`${fecha}T00:00:00`)

  if (Number.isNaN(fechaConvertida.getTime())) {
    return fecha
  }

  return new Intl.DateTimeFormat('es-UY', { dateStyle: 'medium' }).format(fechaConvertida)
}

function formatearPlataformas(plataformas: string[]): string {
  if (plataformas.length === 0) {
    return 'Plataformas sin confirmar'
  }

  return plataformas.slice(0, 3).join(' • ')
}
</script>

<template>
  <section class="favoritos-panel">
    <header v-if="titulo || descripcion || mostrarRecargar" class="favoritos-panel__header">
      <div v-if="titulo || descripcion">
        <h2 v-if="titulo" class="favoritos-panel__title">{{ titulo }}</h2>
        <p v-if="descripcion" class="favoritos-panel__description">{{ descripcion }}</p>
      </div>

      <button
        v-if="mostrarRecargar"
        type="button"
        class="favoritos-panel__reload"
        :disabled="loading"
        @click="emit('recargar')"
      >
        {{ loading ? 'Actualizando...' : 'Recargar' }}
      </button>
    </header>

    <div v-if="error" class="favoritos-panel__message favoritos-panel__message--error">
      {{ error }}
    </div>

    <div v-if="loading && items.length === 0" class="favoritos-panel__grid" aria-hidden="true">
      <article
        v-for="index in skeletonCount"
        :key="`skeleton-${index}`"
        class="favoritos-panel__card favoritos-panel__card--skeleton"
      >
        <div class="favoritos-panel__image-wrapper favoritos-panel__skeleton favoritos-panel__skeleton--image" />

        <div class="favoritos-panel__body">
          <div class="favoritos-panel__topline">
            <div class="favoritos-panel__skeleton favoritos-panel__skeleton--title" />
            <div class="favoritos-panel__skeleton favoritos-panel__skeleton--rating" />
          </div>

          <div class="favoritos-panel__skeleton favoritos-panel__skeleton--meta" />
          <div class="favoritos-panel__skeleton favoritos-panel__skeleton--meta favoritos-panel__skeleton--meta-short" />
        </div>
      </article>
    </div>

    <div v-else-if="items.length === 0" class="favoritos-panel__empty">
      <p class="favoritos-panel__empty-title">{{ emptyTitle }}</p>
      <p class="favoritos-panel__empty-description">{{ emptyDescription }}</p>
    </div>

    <div v-else class="favoritos-panel__grid">
      <article
        v-for="item in items"
        :key="item.id"
        class="favoritos-panel__card"
        @click="emit('seleccionar', item.id)"
      >
        <div class="favoritos-panel__image-wrapper">
          <img
            v-if="item.backgroundImage"
            class="favoritos-panel__image"
            :src="item.backgroundImage"
            :alt="item.name"
          />
          <div v-else class="favoritos-panel__image favoritos-panel__image--placeholder">
            Sin imagen
          </div>

          <button
            type="button"
            class="favoritos-panel__toggle"
            aria-label="Quitar de favoritos"
            @click.stop="emit('toggleFavorito', item.id)"
          >
            ♥
          </button>
        </div>

        <div class="favoritos-panel__body">
          <div class="favoritos-panel__topline">
            <h3 class="favoritos-panel__name">{{ item.name }}</h3>
            <span class="favoritos-panel__rating">{{ item.rating.toFixed(1) }}</span>
          </div>

          <p class="favoritos-panel__meta">{{ formatearFecha(item.released) }}</p>
          <p class="favoritos-panel__meta">{{ formatearPlataformas(item.platforms) }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.favoritos-panel {
  display: grid;
  gap: 1rem;
}

.favoritos-panel__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.favoritos-panel__title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-text);
}

.favoritos-panel__description {
  margin-top: 0.35rem;
  color: var(--color-text-muted);
  line-height: 1.55;
}

.favoritos-panel__reload {
  padding: 0.8rem 1rem;
  border: 1px solid var(--color-border-mid);
  border-radius: 12px;
  color: var(--color-text);
  background: rgba(22, 27, 39, 0.72);
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    background 0.2s ease;
}

.favoritos-panel__reload:hover:not(:disabled) {
  background: var(--color-bg-hover);
  border-color: rgba(124, 58, 237, 0.45);
  transform: translateY(-1px);
}

.favoritos-panel__reload:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.favoritos-panel__message {
  padding: 0.9rem 1rem;
  border-radius: 14px;
  font-size: 0.95rem;
  line-height: 1.5;
}

.favoritos-panel__message--error {
  border: 1px solid rgba(248, 113, 113, 0.35);
  background: rgba(127, 29, 29, 0.22);
  color: #fecaca;
}

.favoritos-panel__status {
  color: var(--color-text-muted);
}

.favoritos-panel__empty {
  display: grid;
  gap: 0.45rem;
  padding: 1.15rem;
  border: 1px dashed rgba(124, 58, 237, 0.28);
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.48);
}

.favoritos-panel__empty-title {
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 700;
}

.favoritos-panel__empty-description {
  color: var(--color-text-muted);
  line-height: 1.55;
}

.favoritos-panel__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 1rem;
}

.favoritos-panel__card {
  overflow: hidden;
  border: 1px solid rgba(124, 58, 237, 0.18);
  border-radius: 18px;
  background: rgba(10, 14, 22, 0.92);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.favoritos-panel__card:hover {
  transform: translateY(-2px);
  border-color: rgba(124, 58, 237, 0.42);
  box-shadow: 0 18px 32px rgba(0, 0, 0, 0.22);
}

.favoritos-panel__card--skeleton {
  cursor: default;
}

.favoritos-panel__card--skeleton:hover {
  transform: none;
  border-color: rgba(124, 58, 237, 0.18);
  box-shadow: none;
}

.favoritos-panel__image-wrapper {
  position: relative;
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.92), rgba(17, 24, 39, 0.96));
}

.favoritos-panel__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.favoritos-panel__image--placeholder {
  display: grid;
  place-items: center;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.favoritos-panel__toggle {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 999px;
  color: #f8fafc;
  background: rgba(124, 58, 237, 0.85);
  box-shadow: 0 10px 22px rgba(79, 70, 229, 0.28);
}

.favoritos-panel__body {
  display: grid;
  gap: 0.45rem;
  padding: 0.95rem;
}

.favoritos-panel__topline {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  justify-content: space-between;
}

.favoritos-panel__name {
  color: var(--color-text);
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.4;
}

.favoritos-panel__rating {
  flex-shrink: 0;
  padding: 0.18rem 0.45rem;
  border-radius: 999px;
  background: rgba(52, 211, 153, 0.12);
  color: #6ee7b7;
  font-size: 0.8rem;
  font-weight: 700;
}

.favoritos-panel__meta {
  color: var(--color-text-muted);
  font-size: 0.84rem;
  line-height: 1.45;
}

.favoritos-panel__skeleton {
  position: relative;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(51, 65, 85, 0.58);
}

.favoritos-panel__skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.28), transparent);
  animation: favoritos-panel-shimmer 1.3s ease-in-out infinite;
}

.favoritos-panel__skeleton--image {
  border-radius: 0;
  width: 100%;
  height: 100%;
}

.favoritos-panel__skeleton--title {
  width: 68%;
  height: 1rem;
}

.favoritos-panel__skeleton--rating {
  width: 2.8rem;
  height: 1.6rem;
}

.favoritos-panel__skeleton--meta {
  width: 80%;
  height: 0.8rem;
}

.favoritos-panel__skeleton--meta-short {
  width: 62%;
}

@keyframes favoritos-panel-shimmer {
  100% {
    transform: translateX(100%);
  }
}

@media (max-width: 640px) {
  .favoritos-panel__header {
    flex-direction: column;
  }

  .favoritos-panel__reload {
    width: 100%;
  }

  .favoritos-panel__grid {
    grid-template-columns: 1fr;
  }
}
</style>
