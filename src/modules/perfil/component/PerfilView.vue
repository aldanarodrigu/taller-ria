<script setup lang="ts">
import { computed, ref } from 'vue'

import AvatarDiceBear from '@/shared/components/AvatarDiceBear.vue'
import FavoritosPanel from '@/shared/components/FavoritosPanel.vue'

import type { DatosPerfilEditable } from '../type/perfil.types'
import type { JuegoFavoritoResumen } from '@/shared/type/favoritos.types'

const props = defineProps<{
  borrador: DatosPerfilEditable
  cargando: boolean
  error: string | null
  exito: string | null
  favoritos: JuegoFavoritoResumen[]
  favoritosCargando: boolean
  favoritosError: string | null
  guardando: boolean
  nickname: string
  perfil: DatosPerfilEditable | null
}>()

const emit = defineEmits<{
  'actualizar-borrador': [cambios: Partial<DatosPerfilEditable>]
  'generar-avatar': []
  guardar: []
  'limpiar-mensajes': []
  restablecer: []
  'seleccionar-favorito': [id: number]
  'toggle-favorito': [id: number]
  volver: []
}>()

const errorLocal = ref<string | null>(null)

const mensajeError = computed(() => errorLocal.value ?? props.error)
const hayCambios = computed(
  () =>
    props.perfil?.avatarSeed !== props.borrador.avatarSeed ||
    props.perfil?.correo !== props.borrador.correo ||
    props.perfil?.nombreVisible !== props.borrador.nombreVisible,
)

function correoEsValido(correo: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
}

function manejarCambio(campo: keyof DatosPerfilEditable, valor: string) {
  errorLocal.value = null
  emit('limpiar-mensajes')
  emit('actualizar-borrador', { [campo]: valor })
}

function manejarGuardado() {
  const correo = props.borrador.correo.trim()

  if (correo && !correoEsValido(correo)) {
    errorLocal.value = 'Ingresa un correo valido para guardar los cambios.'
    return
  }

  errorLocal.value = null
  emit('guardar')
}

function manejarRestablecer() {
  errorLocal.value = null
  emit('restablecer')
}
</script>

<template>
  <section class="perfil-module">
    <div class="perfil-module__contenedor">
      <header class="perfil-module__encabezado">
        <div>
          <p class="perfil-module__eyebrow">Cuenta</p>
          <h1 class="perfil-module__titulo">Perfil</h1>
          <p class="perfil-module__subtitulo">
            Actualiza la informacion basica de tu cuenta
          </p>
        </div>

        <div class="perfil-module__encabezado-acciones">
          <button
            type="button"
            class="perfil-module__boton perfil-module__boton--secundario"
            @click="emit('volver')"
          >
            Volver
          </button>
        </div>
      </header>

      <p v-if="cargando" class="perfil-module__estado">Cargando perfil...</p>

      <div v-else class="perfil-module__tarjeta">
        <aside class="perfil-module__resumen">
          <AvatarDiceBear
            class="perfil-module__avatar"
            :seed="borrador.avatarSeed"
            :size="96"
            alt="Avatar seleccionado"
          />

          <div class="perfil-module__resumen-texto">
            <p class="perfil-module__resumen-label">Cuenta activa</p>
            <p class="perfil-module__nickname">@{{ nickname || 'sin-nickname' }}</p>
            <p class="perfil-module__resumen-copy">
              Tu nickname para iniciar sesion
            </p>
          </div>

          <button
            type="button"
            class="perfil-module__boton perfil-module__boton--secundario"
            :disabled="guardando"
            @click="emit('generar-avatar')"
          >
            Generar otro avatar
          </button>
        </aside>

        <section class="perfil-module__editor">
          <div v-if="mensajeError" class="perfil-module__mensaje perfil-module__mensaje--error">
            {{ mensajeError }}
          </div>

          <div v-else-if="exito" class="perfil-module__mensaje perfil-module__mensaje--exito">
            {{ exito }}
          </div>

          <form class="perfil-module__formulario" @submit.prevent="manejarGuardado">
            <label class="perfil-module__campo">
              <span class="perfil-module__campo-label">Nombre</span>
              <input
                class="perfil-module__input"
                :value="borrador.nombreVisible"
                type="text"
                name="nombreVisible"
                placeholder="Nombre (opcional)"
                :disabled="guardando"
                @input="manejarCambio('nombreVisible', ($event.target as HTMLInputElement).value)"
              />
            </label>

            <label class="perfil-module__campo">
              <span class="perfil-module__campo-label">Correo</span>
              <input
                class="perfil-module__input"
                :value="borrador.correo"
                type="email"
                name="correo"
                placeholder="tu-correo@ejemplo.com"
                :disabled="guardando"
                @input="manejarCambio('correo', ($event.target as HTMLInputElement).value)"
              />
              <small class="perfil-module__ayuda">Opcional. Si lo completas, debe tener un formato valido.</small>
            </label>

            <div class="perfil-module__acciones">
              <button
                type="button"
                class="perfil-module__boton perfil-module__boton--secundario"
                :disabled="guardando || !hayCambios"
                @click="manejarRestablecer"
              >
                Restablecer
              </button>

              <button
                type="submit"
                class="perfil-module__boton perfil-module__boton--primario"
                :disabled="guardando || !hayCambios"
              >
                {{ guardando ? 'Guardando...' : 'Guardar cambios' }}
              </button>
            </div>
          </form>
        </section>
      </div>

      <FavoritosPanel
        class="perfil-module__favoritos"
        :error="favoritosError"
        :items="favoritos"
        :loading="favoritosCargando"
        empty-description="Cuando marques juegos con el corazon apareceran aqui para volver a encontrarlos rapido."
        empty-title="Aun no guardaste juegos favoritos"
        titulo="Juegos favoritos"
        @seleccionar="emit('seleccionar-favorito', $event)"
        @toggle-favorito="emit('toggle-favorito', $event)"
      />
    </div>
  </section>
</template>

<style scoped>
/* Layout */
.perfil-module {
  padding: 40px 20px;
}

.perfil-module__contenedor {
  max-width: 1150px;
  margin: 0 auto;
}

.perfil-module__encabezado {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.perfil-module__eyebrow,
.perfil-module__resumen-label {
  color: #7c3aed;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
}

.perfil-module__titulo {
  font-size: 36px;
}

.perfil-module__subtitulo,
.perfil-module__estado,
.perfil-module__resumen-copy,
.perfil-module__ayuda {
  color: #8892a4;
}

.perfil-module__subtitulo {
  max-width: 670px;
  margin-top: 8px;
}

/* Tarjetas */
.perfil-module__tarjeta,
.perfil-module__favoritos {
  padding: 24px;
  border: 1px solid #1e2433;
  border-radius: 16px;
  background: #161b27;
}

.perfil-module__tarjeta {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 20px;
}

.perfil-module__favoritos {
  margin-top: 24px;
}

.perfil-module__resumen {
  display: grid;
  align-content: start;
  gap: 16px;
  padding: 20px;
  border: 1px solid #1e2433;
  border-radius: 12px;
  background: #0d0f14;
}

.perfil-module__avatar {
  width: 96px;
  height: 96px;
  border: 2px solid #2d3548;
  border-radius: 12px;
  overflow: hidden;
}

.perfil-module__nickname {
  font-size: 18px;
  font-weight: 700;
}

/* Formulario */
.perfil-module__resumen-texto,
.perfil-module__editor,
.perfil-module__formulario {
  display: grid;
  gap: 16px;
}

.perfil-module__campo {
  display: grid;
  gap: 8px;
}

.perfil-module__campo-label {
  font-size: 15px;
  font-weight: 600;
}

.perfil-module__input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #2d3548;
  border-radius: 10px;
  background: #0d0f14;
  color: #e2e8f0;
  font-size: 16px;
}

.perfil-module__input:focus {
  outline: none;
  border-color: #7c3aed;
}

/* Botones */
.perfil-module__acciones {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.perfil-module__boton {
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
}

.perfil-module__input:disabled,
.perfil-module__boton:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.perfil-module__boton--primario {
  background: #7c3aed;
  color: #f8fafc;
}

.perfil-module__boton--secundario {
  border: 1px solid #2d3548;
  background: #0d0f14;
  color: #e2e8f0;
}

/* Mensajes */
.perfil-module__mensaje {
  padding: 14px 16px;
  border-radius: 10px;
  font-size: 15px;
}

.perfil-module__mensaje--error {
  border: 1px solid #ef4444;
  background: #3a1515;
  color: #fecaca;
}

.perfil-module__mensaje--exito {
  border: 1px solid #22c55e;
  background: #14331f;
  color: #bbf7d0;
}

/* Responsive */
@media (max-width: 820px) {
  .perfil-module__tarjeta {
    grid-template-columns: 1fr;
  }

  .perfil-module__encabezado {
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .perfil-module {
    padding: 24px 16px;
  }

  .perfil-module__tarjeta,
  .perfil-module__favoritos,
  .perfil-module__resumen {
    padding: 16px;
  }

  .perfil-module__acciones {
    flex-direction: column-reverse;
  }

  .perfil-module__boton {
    width: 100%;
  }
}
</style>
