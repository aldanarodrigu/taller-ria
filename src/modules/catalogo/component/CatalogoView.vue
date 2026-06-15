<script setup lang="ts">
import { useCatalogo } from '../composable/useCatalogo'
import type { JuegoRawg } from '../type/catalogo.types'
import GameCard from '../../../shared/components/GameCard.vue'

const { items, loading, error, filtros, aplicarFiltro } = useCatalogo()

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
</script>

<template>
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
    </aside>

    <main class="catalogo__contenido">
      <p v-if="loading" class="catalogo__estado">Cargando juegos...</p>
      <p v-else-if="error" class="catalogo__estado catalogo__estado--error">{{ error }}</p>

      <div v-else class="catalogo__grid">
        <GameCard
          v-for="juego in items"
          :key="juego.id"
          :id="juego.id"
          :nombre="juego.name"
          :imagen="juego.background_image"
          :rating="juego.rating"
          :plataformas="getNombrePlataformas(juego)"
          :es-favorito="false"
          @toggle-favorito="() => {}"
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
.catalogo {
  display: flex;
  min-height: 100vh;
  background-color: #0d0d1a;
  color: #ffffff;
}

.catalogo__sidebar {
  width: 220px;
  min-width: 220px;
  padding: 24px 16px;
  background-color: #12122a;
  border-right: 1px solid #2a2a4a;
}

.catalogo__sidebar-titulo {
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 24px;
}

.catalogo__filtro-grupo {
  margin-bottom: 24px;
}

.catalogo__filtro-titulo {
  font-size: 0.7rem;
  font-weight: 600;
  color: #7c3aed;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 8px;
}

.catalogo__filtro-lista {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.catalogo__filtro-opcion {
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #a0a0c0;
  cursor: pointer;
}

.catalogo__filtro-opcion--activo {
  background-color: #7c3aed;
  color: #ffffff;
}

.catalogo__contenido {
  flex: 1;
  padding: 24px;
}

.catalogo__estado {
  color: #a0a0c0;
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
</style>
