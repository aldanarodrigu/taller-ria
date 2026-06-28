<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useBuscador } from '../composable/useBuscador'
import { useAutenticacion } from '@/modules/auth/composable/useAutenticacion'
import { type JuegoRawg } from '../type/buscador.types'
import Navbar from '@/shared/components/Navbar.vue'
import GameCard from '../../../shared/components/GameCard.vue'

const router = useRouter()
const { query, items, loading, error, buscar, limpiar, currentPage, totalPages, goToPage } =
  useBuscador()
const { esFavorito, toggleFavorito, usuarioActual } = useAutenticacion()
const localQuery = ref(query.value)

watch(localQuery, async (nuevoValor) => {
  const texto = nuevoValor.trim()

  if (!texto) {
    limpiar()
    return
  }

  await buscar(texto)
})

function handleSubmit() {
  void buscar(localQuery.value)
}

function handleClear() {
  localQuery.value = ''
  limpiar()
}

function getNombrePlataformas(juego: JuegoRawg): string[] {
  return (juego.platforms ?? []).map((p) => p.platform.name)
}


function irAlDetalle(id: number) {
  void router.push(`/games/${id}`)
}

function changePage(page: number) {
  void goToPage(page)
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
  <section class="buscador">
    <div class="search-box">
      <form @submit.prevent="handleSubmit">
        <input type="search" v-model="localQuery" placeholder="Buscar juegos..." />
        <button type="submit">Buscar</button>
        <button type="button" class="clear-btn" @click="handleClear">Limpiar</button>
      </form>
    </div>

    <div v-if="loading" class="buscador__estado">Cargando resultados...</div>

    <div v-else-if="error" class="buscador__estado buscador__estado--error">
      {{ error }}
    </div>

      <section v-if="items.length > 0" class="results">
        <div class="tabs">
          <button class="active">Todos</button>
        </div>

        <h2>Juegos ({{ items.length }})</h2>

        <div class="buscador__grid">
          <div
            v-for="juego in items"
            :key="juego.id"
            class="buscador__item"
          >
            <GameCard
              :id="juego.id"
              :nombre="juego.name"
              :imagen="juego.background_image"
              :rating="juego.rating"
              :plataformas="getNombrePlataformas(juego)"
              :es-favorito="esFavorito(juego.id)"
              @toggle-favorito="manejarToggleFavorito"
            />
          </div>
        </div>

        <div v-if="totalPages > 1" class="pagination">
          <button
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
            class="pagination__btn"
          >
            ← Anterior
          </button>
          <div class="pagination__info">Página {{ currentPage }} de {{ totalPages }}</div>
          <button
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
            class="pagination__btn"
          >
            Siguiente →
          </button>
        </div>
      </section>


    <div v-else-if="!loading && !error" class="buscador__estado">
      Busca un videojuego para comenzar.
    </div>
  </section>
</template>

<style scoped>
.buscador {
  width: 100%;
  min-height: 100vh;
  padding: 40px;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
}

/* ── Buscador ── */

.search-box {
  margin-bottom: 30px;
}

.search-box form {
  display: flex;
  gap: 0;
}

.search-box input {
  flex: 1;
  padding: 15px;
  border: none;
  outline: none;
  border-radius: 10px 0 0 10px;
  background: var(--color-bg-surface);
  color: var(--color-text);
  font-size: 1rem;
  font-family: var(--font-body);
}

.search-box input::placeholder {
  color: var(--color-text-muted);
}

.search-box button[type='submit'] {
  width: 70px;
  background: var(--color-brand);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  transition: background 0.2s;
}

.search-box button[type='submit']:hover {
  background: var(--color-brand-dark);
}

.clear-btn {
  padding: 0 20px;
  background: var(--color-border-mid);
  color: var(--color-text);
  border-radius: 0 10px 10px 0;
  font-family: var(--font-body);
  font-size: 0.85rem;
  transition: background 0.2s;
}

.clear-btn:hover {
  background: var(--color-border-focus);
}

/* ── Estados ── */

.buscador__estado {
  text-align: center;
  padding: 40px;
  color: var(--color-text-muted);
}

.buscador__estado--error {
  color: var(--color-error, #f87171);
}

/* ── Resultados ── */

.results {
  background: var(--color-bg-surface);
  border-radius: 16px;
  padding: 25px;
  border: 1px solid var(--color-border);
}

.results h2 {
  margin-bottom: 20px;
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
}

/* ── Tabs ── */

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.tabs button {
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-family: var(--font-body);
  color: var(--color-text-muted);
  background: transparent;
  border: 1px solid var(--color-border-mid);
  transition:
    color 0.15s,
    background 0.15s;
}

.tabs button:hover {
  color: var(--color-text-hover);
  background: var(--color-bg-hover);
}

.tabs button.active {
  background: var(--color-brand);
  color: var(--color-text);
  border-color: var(--color-brand);
}

/* ── Tarjeta ── */

.buscador__grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  margin-top: 10px;
}

.buscador__item {
  cursor: pointer;
}


/* ── Paginador ── */

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  padding: 20px 0;
}

.pagination__info {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  white-space: nowrap;
}

.pagination__btn {
  padding: 10px 16px;
  background: var(--color-brand);
  color: var(--color-text);
  border-radius: 8px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.pagination__btn:hover:not(:disabled) {
  background: var(--color-brand-dark);
}

.pagination__btn:disabled {
  background: var(--color-border-mid);
  color: var(--color-text-muted);
  cursor: not-allowed;
}

/* ── Responsive ── */

@media (max-width: 768px) {
  .buscador {
    padding: 20px;
  }

  .tabs {
    flex-wrap: wrap;
  }

  .game-card {
    grid-template-columns: 70px 1fr;
    gap: 12px;
  }

  .year,
  .rating,
  .favorite {
    grid-column: 2;
    text-align: left;
  }
}
</style>
