<script setup lang="ts">
import { computed } from 'vue'

import GraficoGeneros from './GraficoGeneros.vue'

import type { EstadisticasGeneroResponse } from '../type/estadisticas.types'

const props = defineProps<{
  error: string | null
  generos: EstadisticasGeneroResponse | null
  loading: boolean
}>()

const emit = defineEmits<{
  reload: [],
  back: [],
}>()

const listaGeneros = computed(() => props.generos?.results ?? [])
const generosOrdenados = computed(() =>
  [...listaGeneros.value].sort((actual, siguiente) => siguiente.games_count - actual.games_count),
)
const generosPrincipales = computed(() => generosOrdenados.value.slice(0, 19))
const generoConMasJuegos = computed(() => generosOrdenados.value[0] ?? null)
const cantidadGeneros = computed(() => props.generos?.count ?? listaGeneros.value.length)
const totalJuegos = computed(() =>
  listaGeneros.value.reduce((total, genero) => total + genero.games_count, 0),
)
const tieneDatos = computed(() => listaGeneros.value.length > 0)

function formatearNumero(valor: number): string {
  return new Intl.NumberFormat('es-UY').format(valor)
}
</script>

<template>
  <section class="estadisticas-module">
    <header class="estadisticas-module__encabezado">
      <div>
        <h1 class="estadisticas-module__titulo">Estadisticas</h1>
      </div>

      <button
        type="button"
        class="estadisticas-module__boton"
        @click="emit('back')"
      >
        Volver
      </button>
    </header>

    <p v-if="!tieneDatos" class="estadisticas-module__mensaje">
      No hay datos disponibles para mostrar.
    </p>

    <div v-else class="estadisticas-module__contenido">
      <div class="estadisticas-module__resumen">
        <article class="estadisticas-module__tarjeta">
          <p class="estadisticas-module__etiqueta">Generos</p>
          <p class="estadisticas-module__valor">{{ formatearNumero(cantidadGeneros) }}</p>
        </article>

        <article class="estadisticas-module__tarjeta">
          <p class="estadisticas-module__etiqueta">Juegos</p>
          <p class="estadisticas-module__valor">{{ formatearNumero(totalJuegos) }}</p>
        </article>

        <article class="estadisticas-module__tarjeta">
          <p class="estadisticas-module__etiqueta">Mayor genero</p>
          <p class="estadisticas-module__valor">{{ generoConMasJuegos?.name }}</p>
        </article>
      </div>

      <GraficoGeneros :items="generosPrincipales" />
    </div>
  </section>
</template>

<style scoped>
.estadisticas-module {
  display: grid;
  gap: 24px;
  padding: 32px 20px;
}

.estadisticas-module__encabezado {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.estadisticas-module__titulo {
  margin-top: 4px;
  font-size: 36px;
}

.estadisticas-module__boton {
  align-self: start;
  padding: 12px 16px;
  border: 1px solid #2d3548;
  border-radius: 10px;
  background: #0d0f14;
  color: #e2e8f0;
  font-weight: 700;
}

.estadisticas-module__estado,
.estadisticas-module__mensaje {
  padding: 16px;
  border: 1px solid #1e2433;
  border-radius: 16px;
  background: #161b27;
  color: #8892a4;
}

.estadisticas-module__mensaje--error {
  border-color: #ef4444;
  background: #3a1515;
  color: #fecaca;
}

.estadisticas-module__contenido {
  display: grid;
  gap: 20px;
}

.estadisticas-module__resumen {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
}

.estadisticas-module__tarjeta {
  padding: 20px;
  border: 1px solid #1e2433;
  border-radius: 16px;
  background: #161b27;
}

.estadisticas-module__etiqueta {
  color: #8892a4;
  font-size: 13px;
}

.estadisticas-module__valor {
  margin-top: 8px;
  color: #e2e8f0;
  font-size: 24px;
  font-weight: 700;
}

@media (max-width: 720px) {
  .estadisticas-module {
    padding: 24px 16px;
  }

  .estadisticas-module__encabezado {
    flex-direction: column;
  }

  .estadisticas-module__boton {
    align-self: flex-start;
  }

  .estadisticas-module__resumen {
    grid-template-columns: 1fr;
  }
}
</style>
