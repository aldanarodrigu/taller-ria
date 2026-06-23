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
    <div class="formulario-auth__contenedor">
      <header class="formulario-auth__encabezado">
        <p class="formulario-auth__eyebrow">gameXplorer</p>
        <h1 class="formulario-auth__titulo">{{ titulo }}</h1>
        <p class="formulario-auth__subtitulo">{{ subtitulo }}</p>
      </header>

      <p v-if="error" class="formulario-auth__error">{{ error }}</p>

      <form class="formulario-auth__formulario" @submit.prevent="manejarEnvio">
        <label
          v-for="campo in campos"
          :key="campo.clave"
          class="formulario-auth__campo"
        >
          <span class="formulario-auth__campo-label">{{ campo.etiqueta }}</span>
          <input
            v-model="valoresFormulario[campo.clave]"
            class="formulario-auth__input"
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
        <RouterLink class="formulario-auth__link" :to="rutaLink">{{ textoLink }}</RouterLink>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.formulario-auth {
  padding: 60px 20px;
}

.formulario-auth__contenedor {
  max-width: 450px;
  margin: 0 auto;
  padding: 32px;
  border: 1px solid #1e2433;
  border-radius: 16px;
  background: #161b27;
}

.formulario-auth__encabezado,
.formulario-auth__formulario {
  display: grid;
  gap: 16px;
}

.formulario-auth__encabezado {
  margin-bottom: 24px;
}

.formulario-auth__eyebrow {
  color: #7c3aed;
  font-size: 13px;
  font-weight: 700;
}

.formulario-auth__titulo {
  font-size: 34px;
}

.formulario-auth__subtitulo,
.formulario-auth__pie {
  color: #8892a4;
}

.formulario-auth__error {
  margin-bottom: 16px;
  padding: 14px 16px;
  border: 1px solid #ef4444;
  border-radius: 10px;
  background: #3a1515;
  color: #fecaca;
  font-size: 15px;
}

.formulario-auth__campo {
  display: grid;
  gap: 8px;
}

.formulario-auth__campo-label {
  font-size: 15px;
  font-weight: 600;
}

.formulario-auth__input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #2d3548;
  border-radius: 10px;
  background: #0d0f14;
  color: #e2e8f0;
  font-size: 16px;
}

.formulario-auth__input:focus {
  outline: none;
  border-color: #7c3aed;
}

.formulario-auth__input:disabled {
  opacity: 0.65;
}

.formulario-auth__boton {
  margin-top: 8px;
  padding: 14px 16px;
  border-radius: 10px;
  background: #7c3aed;
  color: #f8fafc;
  font-weight: 700;
  font-size: 16px;
}

.formulario-auth__boton:disabled {
  cursor: wait;
  opacity: 0.8;
}

.formulario-auth__pie {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  margin-top: 24px;
  text-align: center;
}

.formulario-auth__link {
  color: #c4b5fd;
  font-weight: 700;
}

@media (max-width: 640px) {
  .formulario-auth {
    padding: 24px 16px;
  }

  .formulario-auth__contenedor {
    padding: 24px;
  }
}
</style>
