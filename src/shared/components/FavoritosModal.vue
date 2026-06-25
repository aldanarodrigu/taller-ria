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
    <div
      v-if="abierto"
      class="favoritos-modal"
      @click.self="emit('cerrar')"
    >
      <section
        class="favoritos-modal__dialogo"
        role="dialog"
        aria-modal="true"
        aria-labelledby="favoritos-modal-title"
      >
        <header class="favoritos-modal__encabezado">
          <div>
            <h2 id="favoritos-modal-title" class="favoritos-modal__titulo">Juegos favoritos</h2>
            <p class="favoritos-modal__descripcion">
              Revisa tus juegos guardados, quitalos de favoritos o entra directo al detalle.
            </p>
          </div>

          <button
            type="button"
            class="favoritos-modal__boton"
            aria-label="Cerrar favoritos"
            @click="emit('cerrar')"
          >
            Cerrar
          </button>
        </header>

        <div class="favoritos-modal__cuerpo">
          <FavoritosPanel
            :error="error"
            :items="items"
            :loading="loading"
            empty-description="Marca juegos con el corazon para encontrarlos rapido desde aqui."
            empty-title="Tu lista de favoritos esta vacia"
            @seleccionar="emit('seleccionar', $event)"
            @toggle-favorito="emit('toggleFavorito', $event)"
          />
        </div>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.favoritos-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 20px;
  /* El fondo oscuro deja claro que el modal aparece sobre otra pantalla. */
  background: #05070d99;
}

.favoritos-modal__dialogo {
  width: 100%;
  max-width: 960px;
  max-height: 720px;
  overflow: auto;
  padding: 24px;
  border: 2px solid #7c3aed;
  border-radius: 8px;
  background: #161b27;
  box-shadow: 0 16px 40px #000000;
}

.favoritos-modal__encabezado {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #1e2433;
}

.favoritos-modal__titulo {
  margin: 0;
  color: #e2e8f0;
  font-size: 28px;
}

.favoritos-modal__descripcion {
  margin: 6px 0 0;
  color: #8892a4;
  font-size: 15px;
  line-height: 1.5;
}

.favoritos-modal__boton {
  padding: 10px 14px;
  border: 1px solid #1e2433;
  border-radius: 8px;
  background: #0d0f14;
  color: #e2e8f0;
  cursor: pointer;
}

.favoritos-modal__cuerpo {
  max-height: 540px;
  overflow: auto;
  padding: 16px;
  border: 1px solid #1e2433;
  border-radius: 8px;
  background: #0d0f14;
}

@media (max-width: 640px) {
  .favoritos-modal {
    align-items: flex-start;
    padding: 12px;
  }

  .favoritos-modal__dialogo {
    padding: 16px;
  }

  .favoritos-modal__encabezado {
    flex-direction: column;
  }

  .favoritos-modal__cuerpo {
    padding: 12px;
  }
}
</style>
