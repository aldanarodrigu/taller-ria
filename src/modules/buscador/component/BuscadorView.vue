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
    <!-- BUSCADOR -->
    <div class="search-box">
      <form @submit.prevent="handleSubmit">
        <input type="search" v-model="localQuery" placeholder="Buscar juegos..." />

        <button type="submit">Buscar</button>

        <button type="button" class="clear-btn" @click="handleClear">Limpiar</button>
      </form>
    </div>

    <!-- ESTADOS -->
    <div v-if="loading" class="buscador__estado">Cargando resultados...</div>

    <div v-else-if="error" class="buscador__estado buscador__estado--error">
      {{ error }}
    </div>

    <!-- RESULTADOS -->
    <section v-if="items.length > 0" class="results">
      <div class="tabs">
        <button class="active">Todos</button>
        <button>Plataforma</button>
        <button>Desarrollador</button>
        <button>Editorial</button>
      </div>

      <h2>Juegos ({{ items.length }})</h2>

      <div v-for="juego in items" :key="juego.id" class="game-card" @click="irAlDetalle(juego.id)">
        <img :src="juego.background_image" :alt="juego.name" />

        <div class="game-info">
          <h3>{{ juego.name }}</h3>
        </div>

        <div class="year">
          {{ juego.released ? juego.released.substring(0, 4) : '-' }}
        </div>

        <div class="rating">⭐ {{ juego.rating }}</div>

        <button class="favorite" type="button" @click.stop>♡</button>
      </div>

      <!-- PAGINADOR -->
      <div v-if="totalPages > 1" class="pagination">
        <button
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
          class="pagination__btn pagination__btn--prev"
        >
          ← Anterior
        </button>

        <div class="pagination__info">Página {{ currentPage }} de {{ totalPages }}</div>

        <button
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
          class="pagination__btn pagination__btn--next"
        >
          Siguiente →
        </button>
      </div>
    </section>

    <div v-else class="buscador__estado">Busca un videojuego para comenzar.</div>
  </section>
</template>

<style scoped>
.buscador {
  width: 100%;
  min-height: 100vh;
  padding: 40px;
  background: var(--color-bg);
  color: var(--color-text);
}

/* BUSCADOR */

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
}

.search-box button {
  cursor: pointer;
}

.search-box button[type='submit'] {
  width: 70px;
  background: var(--color-brand);
  color: var(--color-text);
}

.clear-btn {
  padding: 0 20px;
  background: var(--color-border-mid);
  color: var(--color-text);
  border-radius: 0 10px 10px 0;
}

/* MENSAJES */

.buscador__estado {
  text-align: center;
  padding: 40px;
  color: var(--color-text-muted);
}

.buscador__estado--error {
  color: #f87171;
}

/* RESULTADOS */

.results {
  background: var(--color-bg-surface);
  border-radius: 16px;
  padding: 25px;
}

.results h2 {
  margin-bottom: 20px;
}

/* TARJETA */

.game-card {
  display: grid;
  grid-template-columns: 80px 1fr 100px 100px 50px;
  align-items: center;
  gap: 15px;
  padding: 15px;
  margin-bottom: 12px;
  border-radius: 12px;
  background: var(--color-bg-surface);
  transition: 0.2s;
}

.game-card:hover {
  background: var(--color-bg-hover);
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
}

.year,
.rating {
  color: var(--color-text-muted);
  text-align: center;
}

.favorite {
  background: transparent;
  color: #ffcc66;
  cursor: pointer;
  font-size: 1.2rem;
}

.view-all {
  display: block;
  text-align: right;
  margin-top: 20px;
  color: var(--color-brand);
  text-decoration: none;
  font-weight: bold;
}

/* PAGINADOR */

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
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
}

.pagination__btn:hover:not(:disabled) {
  background: var(--color-brand-dark);
}

.pagination__btn:disabled {
  background: var(--color-border-mid);
  color: var(--color-text-muted);
  cursor: not-allowed;
}

/* RESPONSIVE */

@media (max-width: 768px) {
  .buscador {
    padding: 20px;
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
