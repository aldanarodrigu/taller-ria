<script setup lang="ts">
import { reactive, watch } from 'vue'

import type {
  CampoFormularioAutenticacion,
  ValoresFormularioAutenticacion,
} from '../type/auth.types'

const props = defineProps<{
  campos: CampoFormularioAutenticacion[]
  cargando: boolean
  error: string | null
  rutaLink: string
  subtitulo: string
  textoBoton: string
  textoLink: string
  textoSecundario: string
  titulo: string
  valores: ValoresFormularioAutenticacion
}>()

const emit = defineEmits<{
  enviar: [valores: ValoresFormularioAutenticacion]
}>()

const valoresFormulario = reactive<ValoresFormularioAutenticacion>({})

function sincronizarValores() {
  props.campos.forEach((campo) => {
    valoresFormulario[campo.clave] = props.valores[campo.clave] ?? ''
  })
}

function normalizarValor(clave: string): string {
  const campo = props.campos.find((item) => item.clave === clave)
  const valor = valoresFormulario[clave] ?? ''

  return campo?.tipo === 'password' ? valor : valor.trim()
}

function manejarEnvio() {
  const valoresNormalizados = props.campos.reduce<ValoresFormularioAutenticacion>((acumulador, campo) => {
    acumulador[campo.clave] = normalizarValor(campo.clave)
    return acumulador
  }, {})

  emit('enviar', valoresNormalizados)
}

watch(
  () => props.valores,
  () => {
    sincronizarValores()
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <section class="formulario-auth">
    <div class="formulario-auth__decoracion formulario-auth__decoracion--izquierda" />
    <div class="formulario-auth__decoracion formulario-auth__decoracion--derecha" />

    <div class="formulario-auth__contenedor">
      <header class="formulario-auth__encabezado">
        <p class="formulario-auth__eyebrow">gameXplorer</p>
        <h1>{{ titulo }}</h1>
        <p>{{ subtitulo }}</p>
      </header>

      <p v-if="error" class="formulario-auth__error">{{ error }}</p>

      <form class="formulario-auth__formulario" @submit.prevent="manejarEnvio">
        <label
          v-for="campo in campos"
          :key="campo.clave"
          class="formulario-auth__campo"
        >
          <span>{{ campo.etiqueta }}</span>
          <input
            v-model="valoresFormulario[campo.clave]"
            :type="campo.tipo"
            :name="campo.clave"
            :autocomplete="campo.autocomplete"
            :placeholder="campo.placeholder"
            :disabled="cargando"
            required
          />
        </label>

        <button
          type="submit"
          class="formulario-auth__boton"
          :disabled="cargando"
        >
          {{ cargando ? 'Procesando...' : textoBoton }}
        </button>
      </form>

      <footer class="formulario-auth__pie">
        <span>{{ textoSecundario }}</span>
        <RouterLink :to="rutaLink">{{ textoLink }}</RouterLink>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.formulario-auth {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: grid;
  place-items: center;
  padding: 2rem 1.25rem;
  background:
    radial-gradient(circle at top, rgba(79, 70, 229, 0.22), transparent 30%),
    linear-gradient(180deg, #090b10 0%, #0d0f14 100%);
}

.formulario-auth__decoracion {
  position: absolute;
  width: 18rem;
  height: 18rem;
  border-radius: 999px;
  filter: blur(18px);
  opacity: 0.22;
}

.formulario-auth__decoracion--izquierda {
  top: 10%;
  left: -4rem;
  background: #4f46e5;
}

.formulario-auth__decoracion--derecha {
  right: -5rem;
  bottom: 8%;
  background: #7c3aed;
}

.formulario-auth__contenedor {
  position: relative;
  z-index: 1;
  width: min(100%, 28rem);
  padding: 2rem;
  border: 1px solid rgba(124, 58, 237, 0.24);
  border-radius: 24px;
  background: rgba(12, 15, 22, 0.92);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.32);
  backdrop-filter: blur(18px);
}

.formulario-auth__encabezado {
  display: grid;
  gap: 0.65rem;
  margin-bottom: 1.5rem;
}

.formulario-auth__eyebrow {
  color: #a78bfa;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.formulario-auth__encabezado h1 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.75rem);
  letter-spacing: 0.02em;
}

.formulario-auth__encabezado p {
  color: var(--color-text-muted);
  line-height: 1.5;
}

.formulario-auth__error {
  margin-bottom: 1rem;
  padding: 0.85rem 1rem;
  border: 1px solid rgba(248, 113, 113, 0.35);
  border-radius: 14px;
  background: rgba(127, 29, 29, 0.25);
  color: #fecaca;
  font-size: 0.95rem;
}

.formulario-auth__formulario {
  display: grid;
  gap: 1rem;
}

.formulario-auth__campo {
  display: grid;
  gap: 0.45rem;
}

.formulario-auth__campo span {
  color: var(--color-text);
  font-size: 0.92rem;
  font-weight: 600;
}

.formulario-auth__campo input {
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

.formulario-auth__campo input::placeholder {
  color: #64748b;
}

.formulario-auth__campo input:focus {
  outline: none;
  border-color: rgba(124, 58, 237, 0.8);
  box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.14);
  transform: translateY(-1px);
}

.formulario-auth__campo input:disabled {
  opacity: 0.7;
}

.formulario-auth__boton {
  margin-top: 0.5rem;
  padding: 0.95rem 1rem;
  border-radius: 14px;
  background: linear-gradient(135deg, #7c3aed, #4f46e5);
  color: #f8fafc;
  font-weight: 700;
  font-size: 0.98rem;
  letter-spacing: 0.01em;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease;
}

.formulario-auth__boton:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 16px 28px rgba(79, 70, 229, 0.3);
}

.formulario-auth__boton:disabled {
  cursor: wait;
  opacity: 0.8;
}

.formulario-auth__pie {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  justify-content: center;
  margin-top: 1.5rem;
  color: var(--color-text-muted);
  text-align: center;
}

.formulario-auth__pie a {
  color: #c4b5fd;
  font-weight: 700;
}

@media (max-width: 640px) {
  .formulario-auth__contenedor {
    padding: 1.5rem;
    border-radius: 20px;
  }
}
</style>
