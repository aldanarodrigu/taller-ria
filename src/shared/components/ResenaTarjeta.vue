<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  autor?: string
  fechaActualizacion: string
  mostrarAcciones?: boolean
  puntaje: number | null
  seleccionable?: boolean
  texto: string
  tituloJuego?: string
}>(), {
  autor: '',
  mostrarAcciones: false,
  seleccionable: false,
  tituloJuego: '',
})

const emit = defineEmits<{
  editar: []
  eliminar: []
  seleccionar: []
}>()

const titulo = computed(() => props.tituloJuego || props.autor || 'Resena')
const subtitulo = computed(() => {
  if (props.tituloJuego && props.autor) {
    return props.autor
  }

  return ''
})

const puntajeTexto = computed(() => (props.puntaje === null ? 'Sin puntaje' : `${props.puntaje}/5`))

const fechaTexto = computed(() => {
  const fecha = new Date(props.fechaActualizacion)

  if (Number.isNaN(fecha.getTime())) {
    return 'Fecha sin confirmar'
  }

  return new Intl.DateTimeFormat('es-UY', { dateStyle: 'medium' }).format(fecha)
})

function manejarSeleccion() {
  if (props.seleccionable) {
    emit('seleccionar')
  }
}
</script>

<template>
  <article
    class="resena-tarjeta"
    :class="{ 'resena-tarjeta--seleccionable': seleccionable }"
    @click="manejarSeleccion"
  >
    <header class="resena-tarjeta__encabezado">
      <div>
        <h3 class="resena-tarjeta__titulo">{{ titulo }}</h3>
        <p v-if="subtitulo" class="resena-tarjeta__subtitulo">{{ subtitulo }}</p>
      </div>

      <p class="resena-tarjeta__puntaje">{{ puntajeTexto }}</p>
    </header>

    <p class="resena-tarjeta__texto">{{ texto }}</p>

    <footer class="resena-tarjeta__pie">
      <span class="resena-tarjeta__fecha">{{ fechaTexto }}</span>

      <div v-if="mostrarAcciones" class="resena-tarjeta__acciones">
        <button
          type="button"
          class="resena-tarjeta__boton"
          @click.stop="emit('editar')"
        >
          Editar
        </button>

        <button
          type="button"
          class="resena-tarjeta__boton resena-tarjeta__boton--eliminar"
          @click.stop="emit('eliminar')"
        >
          Eliminar
        </button>
      </div>
    </footer>
  </article>
</template>

<style scoped>
.resena-tarjeta {
  display: grid;
  gap: 12px;
  padding: 16px;
  border: 1px solid #1e2433;
  border-radius: 8px;
  background: #0d0f14;
}

.resena-tarjeta--seleccionable {
  cursor: pointer;
}

.resena-tarjeta__encabezado,
.resena-tarjeta__pie,
.resena-tarjeta__acciones {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.resena-tarjeta__titulo {
  margin: 0;
  color: #e2e8f0;
  font-size: 17px;
}

.resena-tarjeta__subtitulo,
.resena-tarjeta__fecha {
  margin: 4px 0 0;
  color: #8892a4;
  font-size: 14px;
}

.resena-tarjeta__puntaje {
  margin: 0;
  color: #6ee7b7;
  font-size: 14px;
  font-weight: 700;
}

.resena-tarjeta__texto {
  margin: 0;
  color: #e2e8f0;
  font-size: 15px;
  line-height: 1.5;
}

.resena-tarjeta__boton {
  padding: 8px 10px;
  border: 1px solid #7c3aed;
  border-radius: 8px;
  background: #7c3aed;
  color: #ffffff;
  cursor: pointer;
}

.resena-tarjeta__boton--eliminar {
  border-color: #7f1d1d;
  background: #2a1114;
  color: #fecaca;
}

@media (max-width: 640px) {
  .resena-tarjeta__encabezado,
  .resena-tarjeta__pie {
    flex-direction: column;
  }
}
</style>
