<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useBuscador } from '../composable/useBuscador'

const router = useRouter()
const { query, items, loading, error, buscar, limpiar, currentPage, totalPages, goToPage } =
  useBuscador()
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

function irAlDetalle(id: number) {
  void router.push(`/games/${id}`)
}

function changePage(page: number) {
  void goToPage(page)
}
</script>

<template>
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

      <div v-for="juego in items" :key="juego.id" class="game-card" @click="irAlDetalle(juego.id)">
        <img :src="juego.background_image" :alt="juego.name" />
        <div class="game-info">
          <h3>{{ juego.name }}</h3>
        </div>
        <div class="year">{{ juego.released ? juego.released.substring(0, 4) : '-' }}</div>
        <div class="rating">⭐ {{ juego.rating }}</div>
        <button class="favorite" type="button" @click.stop>♡</button>
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

.game-card {
  display: grid;
  grid-template-columns: 80px 1fr 100px 100px 50px;
  align-items: center;
  gap: 15px;
  padding: 15px;
  margin-bottom: 12px;
  border-radius: 12px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition:
    background 0.2s,
    border-color 0.2s;
}

.game-card:hover {
  background: var(--color-bg-hover);
  border-color: var(--color-border-mid);
}

.game-card img {
  width: 65px;
  height: 65px;
  border-radius: 10px;
  object-fit: cover;
}

.game-info h3 {
  margin: 0;
  font-size: 0.95rem;
  font-family: var(--font-body);
  font-weight: 500;
  color: var(--color-text);
}

.year,
.rating {
  color: var(--color-text-muted);
  text-align: center;
  font-size: 0.9rem;
}

.favorite {
  background: transparent;
  color: var(--color-warning, #ffcc66);
  font-size: 1.2rem;
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
