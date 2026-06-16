<script setup lang="ts">
import { computed, ref } from 'vue'

import AvatarDiceBear from '@/shared/components/AvatarDiceBear.vue'

import type { DatosPerfilEditable } from '../type/perfil.types'

const props = defineProps<{
  borrador: DatosPerfilEditable
  cargando: boolean
  error: string | null
  exito: string | null
  guardando: boolean
  nickname: string
  perfil: DatosPerfilEditable | null
}>()

const emit = defineEmits<{
  'actualizar-borrador': [cambios: Partial<DatosPerfilEditable>]
  'generar-avatar': []
  guardar: []
  'limpiar-mensajes': []
  recargar: []
  restablecer: []
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
    <div class="perfil-module__fondo" />

    <div class="perfil-module__contenedor">
      <header class="perfil-module__encabezado">
        <div>
          <p class="perfil-module__eyebrow">Cuenta</p>
          <h1>Perfil</h1>
          <p class="perfil-module__subtitulo">
            Actualiza la informacion basica de tu cuenta y mantenela sincronizada en este navegador.
          </p>
        </div>

        <button type="button" class="perfil-module__refrescar" @click="emit('recargar')">Recargar</button>
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
              Tu nickname se usa para iniciar sesion y por ahora no se puede editar desde esta pantalla.
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
              <span>Nombre</span>
              <input
                :value="borrador.nombreVisible"
                type="text"
                name="nombreVisible"
                placeholder="Nombre (opcional)"
                :disabled="guardando"
                @input="manejarCambio('nombreVisible', ($event.target as HTMLInputElement).value)"
              />
            </label>

            <label class="perfil-module__campo">
              <span>Correo</span>
              <input
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
                :disabled="guardando"
              >
                {{ guardando ? 'Guardando...' : 'Guardar cambios' }}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  </section>
</template>

<style scoped>
.perfil-module {
  position: relative;
  min-height: calc(100vh - 60px);
  padding: 2.5rem 1.25rem 3rem;
  overflow: hidden;
}

.perfil-module__fondo {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top left, rgba(124, 58, 237, 0.18), transparent 30%),
    radial-gradient(circle at bottom right, rgba(79, 70, 229, 0.16), transparent 26%);
  pointer-events: none;
}

.perfil-module__contenedor {
  position: relative;
  z-index: 1;
  width: min(100%, 72rem);
  margin: 0 auto;
}

.perfil-module__encabezado {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1.75rem;
}

.perfil-module__eyebrow {
  margin-bottom: 0.45rem;
  color: #a78bfa;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.perfil-module__encabezado h1 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.8rem);
  letter-spacing: 0.02em;
}

.perfil-module__subtitulo {
  max-width: 42rem;
  margin-top: 0.5rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.perfil-module__refrescar {
  padding: 0.8rem 1rem;
  border: 1px solid var(--color-border-mid);
  border-radius: 12px;
  color: var(--color-text);
  background: rgba(22, 27, 39, 0.75);
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    background 0.2s ease;
}

.perfil-module__refrescar:hover {
  background: var(--color-bg-hover);
  border-color: rgba(124, 58, 237, 0.45);
  transform: translateY(-1px);
}

.perfil-module__estado {
  padding: 1rem 0;
  color: var(--color-text-muted);
}

.perfil-module__tarjeta {
  display: grid;
  grid-template-columns: minmax(16rem, 20rem) minmax(0, 1fr);
  gap: 1.5rem;
  padding: 1.5rem;
  border: 1px solid rgba(124, 58, 237, 0.2);
  border-radius: 24px;
  background: rgba(12, 15, 22, 0.9);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(16px);
}

.perfil-module__resumen {
  display: grid;
  align-content: start;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 20px;
  background:
    linear-gradient(180deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.85)),
    rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(99, 102, 241, 0.18);
}

.perfil-module__avatar {
  width: 96px;
  height: 96px;
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid rgba(124, 58, 237, 0.35);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.24);
}

.perfil-module__resumen-texto {
  display: grid;
  gap: 0.55rem;
}

.perfil-module__resumen-label {
  color: #a78bfa;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.perfil-module__nickname {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
}

.perfil-module__resumen-copy {
  color: var(--color-text-muted);
  line-height: 1.55;
}

.perfil-module__editor {
  display: grid;
  align-content: start;
  gap: 1rem;
}

.perfil-module__mensaje {
  padding: 0.9rem 1rem;
  border-radius: 14px;
  font-size: 0.95rem;
  line-height: 1.5;
}

.perfil-module__mensaje--error {
  border: 1px solid rgba(248, 113, 113, 0.35);
  background: rgba(127, 29, 29, 0.22);
  color: #fecaca;
}

.perfil-module__mensaje--exito {
  border: 1px solid rgba(74, 222, 128, 0.28);
  background: rgba(20, 83, 45, 0.24);
  color: #bbf7d0;
}

.perfil-module__formulario {
  display: grid;
  gap: 1.1rem;
}

.perfil-module__campo {
  display: grid;
  gap: 0.45rem;
}

.perfil-module__campo span {
  color: var(--color-text);
  font-size: 0.94rem;
  font-weight: 600;
}

.perfil-module__campo input {
  width: 100%;
  padding: 0.95rem 1rem;
  border: 1px solid var(--color-border-mid);
  border-radius: 14px;
  background: rgba(22, 27, 39, 0.88);
  color: var(--color-text);
  font-size: 0.98rem;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.perfil-module__campo input::placeholder {
  color: #64748b;
}

.perfil-module__campo input:focus {
  outline: none;
  border-color: rgba(124, 58, 237, 0.82);
  box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.14);
  transform: translateY(-1px);
}

.perfil-module__campo input:disabled {
  opacity: 0.72;
}

.perfil-module__ayuda {
  color: var(--color-text-muted);
  font-size: 0.82rem;
  line-height: 1.5;
}

.perfil-module__acciones {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 0.25rem;
}

.perfil-module__boton {
  padding: 0.95rem 1.1rem;
  border-radius: 14px;
  font-size: 0.95rem;
  font-weight: 700;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.perfil-module__boton:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.perfil-module__boton--primario {
  background: linear-gradient(135deg, #7c3aed, #4f46e5);
  color: #f8fafc;
}

.perfil-module__boton--primario:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 16px 28px rgba(79, 70, 229, 0.28);
}

.perfil-module__boton--secundario {
  border: 1px solid var(--color-border-mid);
  background: rgba(22, 27, 39, 0.75);
  color: var(--color-text);
}

.perfil-module__boton--secundario:hover:not(:disabled) {
  transform: translateY(-1px);
  border-color: rgba(124, 58, 237, 0.45);
  background: var(--color-bg-hover);
}

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
    padding: 1.5rem 1rem 2.5rem;
  }

  .perfil-module__tarjeta {
    padding: 1rem;
    border-radius: 20px;
  }

  .perfil-module__resumen {
    padding: 1rem;
  }

  .perfil-module__acciones {
    flex-direction: column-reverse;
  }

  .perfil-module__boton {
    width: 100%;
  }
}
</style>
