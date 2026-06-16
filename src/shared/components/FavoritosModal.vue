<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'

import FavoritosPanel from './FavoritosPanel.vue'
import type { JuegoFavoritoResumen } from '../type/favoritos.types'

const props = defineProps<{
  abierto: boolean
  error: string | null
  items: JuegoFavoritoResumen[]
  loading: boolean
}>()

const emit = defineEmits<{
  cerrar: []
  recargar: []
  seleccionar: [id: number]
  toggleFavorito: [id: number]
}>()

function manejarTecla(evento: KeyboardEvent) {
  if (props.abierto && evento.key === 'Escape') {
    emit('cerrar')
  }
}

watch(() => props.abierto, (abierto) => {
  document.body.style.overflow = abierto ? 'hidden' : ''
})

onMounted(() => {
  document.addEventListener('keydown', manejarTecla)
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', manejarTecla)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="favoritos-modal">
      <div
        v-if="abierto"
        class="favoritos-modal"
        @click.self="emit('cerrar')"
      >
        <section
          class="favoritos-modal__dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="favoritos-modal-title"
        >
          <header class="favoritos-modal__header">
            <div>
              <p class="favoritos-modal__eyebrow">Tu biblioteca</p>
              <h2 id="favoritos-modal-title" class="favoritos-modal__title">Juegos favoritos</h2>
              <p class="favoritos-modal__description">
                Revisa tus juegos guardados, quitalos de favoritos o entra directo al detalle.
              </p>
            </div>

            <button
              type="button"
              class="favoritos-modal__close"
              aria-label="Cerrar favoritos"
              @click="emit('cerrar')"
            >
              Cerrar
            </button>
          </header>

          <FavoritosPanel
            :error="error"
          :items="items"
          :loading="loading"
          empty-description="Marca juegos con el corazon para encontrarlos rapido desde aqui."
          empty-title="Tu lista de favoritos esta vacia"
          @seleccionar="emit('seleccionar', $event)"
          @toggle-favorito="emit('toggleFavorito', $event)"
        />
      </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.favoritos-modal {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: grid;
  place-items: center;
  padding: 1.25rem;
  background: rgba(3, 7, 18, 0.76);
  backdrop-filter: blur(8px);
}

.favoritos-modal__dialog {
  width: min(100%, 64rem);
  max-height: min(85vh, 48rem);
  overflow: auto;
  padding: 1.35rem;
  border: 1px solid rgba(124, 58, 237, 0.28);
  border-radius: 24px;
  background:
    radial-gradient(circle at top right, rgba(79, 70, 229, 0.14), transparent 26%),
    rgba(7, 10, 18, 0.97);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.38);
}

.favoritos-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.favoritos-modal__eyebrow {
  color: #a78bfa;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.favoritos-modal__title {
  margin-top: 0.35rem;
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 4vw, 2.2rem);
  color: var(--color-text);
}

.favoritos-modal__description {
  margin-top: 0.45rem;
  color: var(--color-text-muted);
  line-height: 1.55;
}

.favoritos-modal__close {
  padding: 0.8rem 1rem;
  border: 1px solid var(--color-border-mid);
  border-radius: 12px;
  background: rgba(22, 27, 39, 0.72);
  color: var(--color-text);
}

.favoritos-modal-enter-active,
.favoritos-modal-leave-active {
  transition: opacity 0.2s ease;
}

.favoritos-modal-enter-from,
.favoritos-modal-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .favoritos-modal {
    padding: 0.75rem;
  }

  .favoritos-modal__dialog {
    padding: 1rem;
    border-radius: 20px;
  }

  .favoritos-modal__header {
    flex-direction: column;
  }

  .favoritos-modal__close {
    width: 100%;
  }
}
</style>
