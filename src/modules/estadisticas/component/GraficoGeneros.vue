<script setup lang="ts">
import { computed } from 'vue'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'
import { Bar } from 'vue-chartjs'

import type { Resultados } from '../type/estadisticas.types'

const props = defineProps<{
  items: Resultados[]
}>()

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const chartData = computed<ChartData<'bar'>>(() => ({
  labels: props.items.map((item) => item.name),
  datasets: [
    {
      label: 'Juegos',
      data: props.items.map((item) => item.games_count),
      backgroundColor: '#7c3aed',
      borderColor: '#7c3aed',
      borderWidth: 1,
    },
  ],
}))

const chartOptions: ChartOptions<'bar'> = {
  animation: false,
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    x: {
      grid: {
        color: '#1e2433',
      },
      ticks: {
        color: '#8892a4',
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#8892a4',
      },
    },
  },
}

const descripcionGrafico = computed(() =>
  props.items
    .map((item) => `${item.name}: ${item.games_count} juegos`)
    .join(', '),
)
</script>

<template>
  <section class="grafico-generos">
    <header class="grafico-generos__encabezado">
      <h2 class="grafico-generos__titulo">Juegos por genero</h2>
      <p class="grafico-generos__descripcion">Top 8 segun cantidad de juegos.</p>
    </header>

    <div class="grafico-generos__contenedor">
      <div class="grafico-generos__canvas">
        <Bar
          :aria-label="descripcionGrafico"
          :data="chartData"
          :options="chartOptions"
          role="img"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.grafico-generos {
  display: grid;
  gap: 16px;
  padding: 24px;
  border: 1px solid #1e2433;
  border-radius: 16px;
  background: #161b27;
}

.grafico-generos__titulo {
  font-size: 24px;
}

.grafico-generos__descripcion {
  margin-top: 6px;
  color: #8892a4;
}

.grafico-generos__contenedor {
  overflow-x: auto;
}

.grafico-generos__canvas {
  min-width: 720px;
  height: 420px;
}

@media (max-width: 640px) {
  .grafico-generos {
    padding: 16px;
  }

  .grafico-generos__canvas {
    height: 460px;
  }
}
</style>
