<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAutenticacion } from '@/modules/auth/composable/useAutenticacion'
import Navbar from '@/shared/components/Navbar.vue'
import { useCatalogo } from '../composable/useCatalogo'
import type { JuegoRawg } from '../type/catalogo.types'
import GameCard from '../../../shared/components/GameCard.vue'

import '../../../main.css'

const router = useRouter()
const { esFavorito, toggleFavorito, usuarioActual } = useAutenticacion()
const { items, loading, error, filtros, hayMas, aplicarFiltro, cargarMas } = useCatalogo()

const centinela = ref<HTMLElement | null>(null)
let observador: IntersectionObserver | null = null

onMounted(() => {
  observador = new IntersectionObserver(
    (entradas) => {
      if (entradas[0].isIntersecting && hayMas.value && !loading.value) {
        void cargarMas()
      }
    },
    { rootMargin: '0px 0px 300px 0px' },
  )
  if (centinela.value) observador.observe(centinela.value)
})

onBeforeUnmount(() => {
  observador?.disconnect()
})

const generos = [
  { slug: 'action', label: 'Acción' },
  { slug: 'adventure', label: 'Aventura' },
  { slug: 'role-playing-games-rpg', label: 'RPG' },
  { slug: 'strategy', label: 'Estrategia' },
  { slug: 'shooter', label: 'Disparos' },
  { slug: 'puzzle', label: 'Puzzle' },
  { slug: 'sports', label: 'Deportes' },
  { slug: 'racing', label: 'Carreras' },
]

const plataformas = [
  { id: 4, label: 'PC' },
  { id: 187, label: 'PlayStation 5' },
  { id: 18, label: 'PlayStation 4' },
  { id: 186, label: 'Xbox Series X/S' },
  { id: 7, label: 'Nintendo Switch' },
  { id: 3, label: 'iOS' },
  { id: 21, label: 'Android' },
]

function getNombrePlataformas(juego: JuegoRawg): string[] {
  return juego.platforms.map((p) => p.platform.name)
}

function manejarToggleFavorito(gameId: number) {
  if (!usuarioActual.value) {
    void router.push('/iniciar-sesion')
    return
  }
  toggleFavorito(gameId)
}
</script>

<template>
  <Navbar />
  <div class="catalogo">
    <aside class="catalogo__sidebar">
      <h2 class="catalogo__sidebar-titulo">Todos los Juegos</h2>

      <div class="catalogo__filtro-grupo">
        <h3 class="catalogo__filtro-titulo">Género</h3>
        <ul class="catalogo__filtro-lista">
          <li
            class="catalogo__filtro-opcion"
            :class="{ 'catalogo__filtro-opcion--activo': filtros.genero === '' }"
            @click="aplicarFiltro({ genero: '' })"
          >
            Todos
          </li>
          <li
            v-for="genero in generos"
            :key="genero.slug"
            class="catalogo__filtro-opcion"
            :class="{ 'catalogo__filtro-opcion--activo': filtros.genero === genero.slug }"
            @click="aplicarFiltro({ genero: genero.slug })"
          >
            {{ genero.label }}
          </li>
        </ul>
      </div>

      <div class="catalogo__filtro-grupo">
        <h3 class="catalogo__filtro-titulo">Plataforma</h3>
        <ul class="catalogo__filtro-lista">
          <li
            class="catalogo__filtro-opcion"
            :class="{ 'catalogo__filtro-opcion--activo': filtros.plataforma === null }"
            @click="aplicarFiltro({ plataforma: null })"
          >
            Todas
          </li>
          <li
            v-for="plataforma in plataformas"
            :key="plataforma.id"
            class="catalogo__filtro-opcion"
            :class="{ 'catalogo__filtro-opcion--activo': filtros.plataforma === plataforma.id }"
            @click="aplicarFiltro({ plataforma: plataforma.id })"
          >
            {{ plataforma.label }}
          </li>
        </ul>
      </div>

      <div class="catalogo__filtro-grupo">
        <h3 class="catalogo__filtro-titulo">Ordenar por</h3>
        <ul class="catalogo__filtro-lista">
          <li
            class="catalogo__filtro-opcion"
            :class="{ 'catalogo__filtro-opcion--activo': filtros.orden === '-rating' }"
            @click="aplicarFiltro({ orden: '-rating' })"
          >
            Popularidad
          </li>
          <li
            class="catalogo__filtro-opcion"
            :class="{ 'catalogo__filtro-opcion--activo': filtros.orden === 'name' }"
            @click="aplicarFiltro({ orden: 'name' })"
          >
            Nombre (A-Z)
          </li>
        </ul>
      </div>
    </aside>

    <main class="catalogo__contenido">
      <p v-if="loading && items.length === 0" class="catalogo__estado">Cargando juegos...</p>
      <p v-else-if="error" class="catalogo__estado catalogo__estado--error">{{ error }}</p>

      <TransitionGroup v-else tag="div" name="tarjeta" class="catalogo__grid">
        <GameCard
          v-for="juego in items"
          :key="juego.id"
          :id="juego.id"
          :nombre="juego.name"
          :imagen="juego.background_image"
          :rating="juego.rating"
          :plataformas="getNombrePlataformas(juego)"
          :es-favorito="esFavorito(juego.id)"
          @toggle-favorito="manejarToggleFavorito"
        />
      </TransitionGroup>

      <div ref="centinela" class="catalogo__centinela">
        <span v-if="loading && items.length > 0" class="catalogo__spinner" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.catalogo {
  display: flex;
  min-height: 100vh;
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
}

/* ── Sidebar ── */
.catalogo__sidebar {
  width: 220px;
  min-width: 220px;
  padding: 24px 16px;
  background-color: var(--color-bg-surface);
  border-right: 1px solid var(--color-border);
}

.catalogo__sidebar-titulo {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 24px;
}

/* ── Filtros ── */
.catalogo__filtro-grupo {
  margin-bottom: 24px;
}

.catalogo__filtro-titulo {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--color-brand);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 8px;
}

.catalogo__filtro-lista {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.catalogo__filtro-opcion {
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--color-text-muted);
  cursor: pointer;
  transition:
    color 0.15s,
    background-color 0.15s;
}

.catalogo__filtro-opcion:hover {
  color: var(--color-text-hover);
  background-color: var(--color-bg-hover);
}

.catalogo__filtro-opcion--activo {
  color: var(--color-text);
  background: var(--color-bg-hover);
  position: relative;
}

.catalogo__filtro-opcion--activo::after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 20px;
  background: var(--color-brand);
  border-radius: 2px;
}
/* ── Contenido principal ── */
.catalogo__contenido {
  flex: 1;
  padding: 24px;
}

.catalogo__estado {
  color: var(--color-text-muted);
  text-align: center;
  padding: 48px;
}

.catalogo__estado--error {
  color: #f87171;
}

.catalogo__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
}

/* ── Transición ── */
.tarjeta-enter-active {
  transition: opacity 0.3s ease;
}

.tarjeta-enter-from {
  opacity: 0;
}

/* ── Infinite scroll centinela ── */
.catalogo__centinela {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.catalogo__spinner {
  width: 28px;
  height: 28px;
  border: 3px solid var(--color-border-mid);
  border-top-color: var(--color-brand);
  border-radius: 50%;
  animation: girar 0.7s linear infinite;
}

@keyframes girar {
  to {
    transform: rotate(360deg);
  }
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .catalogo__sidebar {
    width: 180px;
    min-width: 180px;
  }
}

@media (max-width: 640px) {
  .catalogo {
    flex-direction: column;
  }

  .catalogo__sidebar {
    width: 100%;
    min-width: unset;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    padding: 8px 0;
    display: flex;
    flex-direction: column;
    gap: 0;
    overflow: visible;
  }

  .catalogo__sidebar-titulo {
    display: none;
  }

  .catalogo__filtro-grupo {
    margin-bottom: 0;
    padding: 6px 0;
    position: relative;
  }

  .catalogo__filtro-opcion--activo::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 2px;
    background: var(--color-brand);
    border-radius: 2px;
  }

  .catalogo__filtro-titulo {
    padding: 0 16px;
  }

  .catalogo__filtro-lista {
    flex-direction: row;
    overflow-x: auto;
    padding: 4px 16px;
    gap: 8px;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }

  .catalogo__filtro-lista::-webkit-scrollbar {
    display: none;
  }

  .catalogo__filtro-opcion {
    white-space: nowrap;
    flex-shrink: 0;
  }

  .catalogo__contenido {
    padding: 16px;
  }

  .catalogo__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}
</style>
