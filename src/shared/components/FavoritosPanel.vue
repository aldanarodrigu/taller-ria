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
  titulo?: string
}>(), {
  descripcion: '',
  emptyDescription: 'Todavia no agregaste juegos a tu lista.',
  emptyTitle: 'No tienes favoritos guardados',
  mostrarRecargar: false,
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

  return plataformas.slice(0, 3).join(' - ')
}
</script>

<template>
  <section class="favoritos-panel">
    <header v-if="titulo || descripcion || mostrarRecargar" class="favoritos-panel__encabezado">
      <div v-if="titulo || descripcion">
        <h2 v-if="titulo" class="favoritos-panel__titulo">{{ titulo }}</h2>
        <p v-if="descripcion" class="favoritos-panel__descripcion">{{ descripcion }}</p>
      </div>

      <button
        v-if="mostrarRecargar"
        type="button"
        class="favoritos-panel__boton-recargar"
        :disabled="loading"
        @click="emit('recargar')"
      >
        {{ loading ? 'Actualizando...' : 'Recargar' }}
      </button>
    </header>

    <div v-if="error" class="favoritos-panel__mensaje favoritos-panel__mensaje--error">
      {{ error }}
    </div>

    <div v-if="loading && items.length === 0" class="favoritos-panel__estado">
      Cargando favoritos...
    </div>

    <div v-else-if="items.length === 0" class="favoritos-panel__vacio">
      <p class="favoritos-panel__vacio-titulo">{{ emptyTitle }}</p>
      <p class="favoritos-panel__vacio-descripcion">{{ emptyDescription }}</p>
    </div>

    <div v-else class="favoritos-panel__lista">
      <article
        v-for="item in items"
        :key="item.id"
        class="favoritos-panel__tarjeta"
        @click="emit('seleccionar', item.id)"
      >
        <div class="favoritos-panel__imagen-contenedor">
          <img
            v-if="item.backgroundImage"
            class="favoritos-panel__imagen"
            :src="item.backgroundImage"
            :alt="item.name"
          />
          <div v-else class="favoritos-panel__imagen favoritos-panel__imagen--placeholder">
            Sin imagen
          </div>
        </div>

        <div class="favoritos-panel__contenido">
          <div class="favoritos-panel__fila">
            <h3 class="favoritos-panel__nombre">{{ item.name }}</h3>
            <span class="favoritos-panel__puntaje">{{ item.rating.toFixed(1) }}</span>
          </div>

          <p class="favoritos-panel__dato">{{ formatearFecha(item.released) }}</p>
          <p class="favoritos-panel__dato">{{ formatearPlataformas(item.platforms) }}</p>
        </div>

        <button
          type="button"
          class="favoritos-panel__boton-quitar"
          aria-label="Quitar de favoritos"
          @click.stop="emit('toggleFavorito', item.id)"
        >
          Quitar
        </button>
      </article>
    </div>
  </section>
</template>

<style scoped>
.favoritos-panel {
  display: grid;
  gap: 16px;
  color: #e2e8f0;
}

.favoritos-panel__encabezado {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.favoritos-panel__titulo {
  margin: 0;
  color: #e2e8f0;
  font-size: 24px;
}

.favoritos-panel__descripcion {
  margin: 6px 0 0;
  color: #8892a4;
  font-size: 15px;
  line-height: 1.5;
}

.favoritos-panel__boton-recargar {
  padding: 10px 14px;
  border: 1px solid #1e2433;
  border-radius: 8px;
  background: #7c3aed;
  color: #ffffff;
  cursor: pointer;
}

.favoritos-panel__boton-recargar:disabled {
  background: #374151;
  cursor: not-allowed;
}

.favoritos-panel__mensaje {
  padding: 12px;
  border-radius: 8px;
  font-size: 15px;
  line-height: 1.5;
}

.favoritos-panel__mensaje--error {
  border: 1px solid #7f1d1d;
  background: #2a1114;
  color: #fecaca;
}

.favoritos-panel__estado,
.favoritos-panel__vacio {
  display: grid;
  gap: 8px;
  padding: 16px;
  border: 1px solid #1e2433;
  border-radius: 8px;
  background: #161b27;
  color: #8892a4;
}

.favoritos-panel__vacio-titulo {
  margin: 0;
  color: #e2e8f0;
  font-size: 16px;
  font-weight: 700;
}

.favoritos-panel__vacio-descripcion {
  margin: 0;
  color: #8892a4;
  line-height: 1.5;
}

.favoritos-panel__lista {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.favoritos-panel__tarjeta {
  display: grid;
  grid-template-columns: 96px 1fr auto;
  align-items: center;
  gap: 12px;
  overflow: hidden;
  padding: 12px;
  border: 1px solid #1e2433;
  border-radius: 8px;
  background: #0d0f14;
  cursor: pointer;
}

.favoritos-panel__imagen-contenedor {
  width: 96px;
  height: 72px;
  overflow: hidden;
  border: 1px solid #1e2433;
  border-radius: 8px;
  background: #161b27;
}

.favoritos-panel__imagen {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favoritos-panel__imagen--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8892a4;
  font-size: 14px;
}

.favoritos-panel__boton-quitar {
  padding: 6px 10px;
  border: 1px solid #7c3aed;
  border-radius: 8px;
  background: #7c3aed;
  color: #ffffff;
  cursor: pointer;
}

.favoritos-panel__contenido {
  display: grid;
  gap: 6px;
}

.favoritos-panel__fila {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.favoritos-panel__nombre {
  margin: 0;
  color: #e2e8f0;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.4;
}

.favoritos-panel__puntaje {
  flex-shrink: 0;
  color: #6ee7b7;
  font-size: 14px;
  font-weight: 700;
}

.favoritos-panel__dato {
  margin: 0;
  color: #8892a4;
  font-size: 14px;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .favoritos-panel__lista {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .favoritos-panel__encabezado {
    flex-direction: column;
  }

  .favoritos-panel__tarjeta {
    grid-template-columns: 80px 1fr;
    align-items: flex-start;
  }

  .favoritos-panel__imagen-contenedor {
    width: 80px;
    height: 64px;
  }

  .favoritos-panel__boton-quitar {
    grid-column: 2;
    justify-self: start;
  }
}
</style>
