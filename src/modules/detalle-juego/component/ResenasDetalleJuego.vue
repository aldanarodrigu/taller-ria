<script setup lang="ts">
import ResenaTarjeta from '@/shared/components/ResenaTarjeta.vue'

interface ResenaDetalleItem {
  esPropia: boolean
  fechaActualizacion: string
  gameId: number
  nickname: string
  nombreVisible: string
  puntaje: number | null
  texto: string
  tituloJuego: string
  usuarioId: string
}

defineProps<{
  editando: boolean
  error: string | null
  exito: string | null
  hayResenas: boolean
  puntaje: number | null
  resenas: ResenaDetalleItem[]
  texto: string
  tieneResena: boolean
  tieneSesion: boolean
}>()

const emit = defineEmits<{
  actualizarPuntaje: [puntaje: number | null]
  actualizarTexto: [texto: string]
  cancelar: []
  eliminar: []
  guardar: []
  iniciarEdicion: []
}>()

const puntajes = [1, 2, 3, 4, 5]

function manejarTexto(evento: Event) {
  emit('actualizarTexto', (evento.target as HTMLTextAreaElement).value)
}

function manejarPuntaje(evento: Event) {
  const valor = (evento.target as HTMLSelectElement).value
  emit('actualizarPuntaje', valor ? Number(valor) : null)
}

function obtenerAutor(resena: ResenaDetalleItem): string {
  return resena.nombreVisible || `@${resena.nickname}`
}
</script>

<template>
  <section class="resenas-detalle-juego">
    <header class="resenas-detalle-juego__encabezado">
      <h2 class="resenas-detalle-juego__titulo">Resenas</h2>
      <p class="resenas-detalle-juego__subtitulo">Opiniones guardadas por los usuarios de este navegador.</p>
    </header>

    <div class="resenas-detalle-juego__formulario">
      <p v-if="!tieneSesion" class="resenas-detalle-juego__aviso">
        Inicia sesion para escribir tu resena.
      </p>

      <form
        v-else-if="editando || !tieneResena"
        class="resenas-detalle-juego__campos"
        @submit.prevent="emit('guardar')"
      >
        <label class="resenas-detalle-juego__campo">
          <span class="resenas-detalle-juego__label">Tu resena</span>
          <textarea
            class="resenas-detalle-juego__textarea"
            :value="texto"
            rows="4"
            placeholder="Escribe que te parecio el juego"
            @input="manejarTexto"
          />
        </label>

        <label class="resenas-detalle-juego__campo">
          <span class="resenas-detalle-juego__label">Puntaje opcional</span>
          <select class="resenas-detalle-juego__select" :value="puntaje ?? ''" @change="manejarPuntaje">
            <option value="">Sin puntaje</option>
            <option v-for="valor in puntajes" :key="valor" :value="valor">
              {{ valor }}/5
            </option>
          </select>
        </label>

        <div class="resenas-detalle-juego__acciones">
          <button type="submit" class="resenas-detalle-juego__boton resenas-detalle-juego__boton--primario">
            Guardar resena
          </button>

          <button
            v-if="tieneResena"
            type="button"
            class="resenas-detalle-juego__boton"
            @click="emit('cancelar')"
          >
            Cancelar
          </button>
        </div>
      </form>

      <div v-else class="resenas-detalle-juego__estado-propio">
        <p class="resenas-detalle-juego__estado-texto">Ya publicaste una resena para este juego.</p>
        <div class="resenas-detalle-juego__acciones">
          <button type="button" class="resenas-detalle-juego__boton" @click="emit('iniciarEdicion')">
            Editar
          </button>
          <button
            type="button"
            class="resenas-detalle-juego__boton resenas-detalle-juego__boton--eliminar"
            @click="emit('eliminar')"
          >
            Eliminar
          </button>
        </div>
      </div>

      <p v-if="error" class="resenas-detalle-juego__mensaje resenas-detalle-juego__mensaje--error">
        {{ error }}
      </p>
      <p v-else-if="exito" class="resenas-detalle-juego__mensaje resenas-detalle-juego__mensaje--exito">
        {{ exito }}
      </p>
    </div>

    <div v-if="hayResenas" class="resenas-detalle-juego__lista">
      <ResenaTarjeta
        v-for="resena in resenas"
        :key="`${resena.usuarioId}-${resena.gameId}`"
        :autor="obtenerAutor(resena)"
        :fecha-actualizacion="resena.fechaActualizacion"
        :mostrar-acciones="resena.esPropia"
        :puntaje="resena.puntaje"
        :texto="resena.texto"
        @editar="emit('iniciarEdicion')"
        @eliminar="emit('eliminar')"
      />
    </div>

    <p v-else class="resenas-detalle-juego__vacio">Todavia no hay resenas para este juego.</p>
  </section>
</template>

<style scoped>
.resenas-detalle-juego {
  display: grid;
  gap: 16px;
  padding: 20px;
  border: 1px solid #1e2433;
  border-radius: 8px;
  background: #161b27;
}

.resenas-detalle-juego__encabezado,
.resenas-detalle-juego__formulario,
.resenas-detalle-juego__campos,
.resenas-detalle-juego__lista {
  display: grid;
  gap: 12px;
}

.resenas-detalle-juego__titulo {
  margin: 0;
  color: #e2e8f0;
  font-size: 24px;
}

.resenas-detalle-juego__subtitulo,
.resenas-detalle-juego__aviso,
.resenas-detalle-juego__estado-texto,
.resenas-detalle-juego__vacio {
  margin: 0;
  color: #8892a4;
  line-height: 1.5;
}

.resenas-detalle-juego__formulario,
.resenas-detalle-juego__estado-propio,
.resenas-detalle-juego__vacio {
  padding: 16px;
  border: 1px solid #1e2433;
  border-radius: 8px;
  background: #0d0f14;
}

.resenas-detalle-juego__campo {
  display: grid;
  gap: 8px;
}

.resenas-detalle-juego__label {
  color: #e2e8f0;
  font-size: 15px;
  font-weight: 700;
}

.resenas-detalle-juego__textarea,
.resenas-detalle-juego__select {
  width: 100%;
  padding: 12px;
  border: 1px solid #2d3548;
  border-radius: 8px;
  background: #161b27;
  color: #e2e8f0;
  font-size: 15px;
}

.resenas-detalle-juego__textarea {
  resize: vertical;
}

.resenas-detalle-juego__acciones {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.resenas-detalle-juego__boton {
  padding: 10px 14px;
  border: 1px solid #2d3548;
  border-radius: 8px;
  background: #0d0f14;
  color: #e2e8f0;
  cursor: pointer;
}

.resenas-detalle-juego__boton--primario {
  border-color: #7c3aed;
  background: #7c3aed;
  color: #ffffff;
}

.resenas-detalle-juego__boton--eliminar {
  border-color: #7f1d1d;
  background: #2a1114;
  color: #fecaca;
}

.resenas-detalle-juego__mensaje {
  margin: 0;
  padding: 10px 12px;
  border-radius: 8px;
}

.resenas-detalle-juego__mensaje--error {
  border: 1px solid #7f1d1d;
  background: #2a1114;
  color: #fecaca;
}

.resenas-detalle-juego__mensaje--exito {
  border: 1px solid #166534;
  background: #102417;
  color: #bbf7d0;
}

@media (max-width: 640px) {
  .resenas-detalle-juego {
    padding: 16px;
  }

  .resenas-detalle-juego__boton {
    width: 100%;
  }
}
</style>
