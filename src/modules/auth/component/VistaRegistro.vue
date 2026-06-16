<script setup lang="ts">
import { computed, ref } from 'vue'

import FormularioAutenticacion from './FormularioAutenticacion.vue'

import type {
  CampoFormularioAutenticacion,
  DatosRegistro,
  ValoresFormularioAutenticacion,
} from '../type/auth.types'

const props = defineProps<{
  cargando: boolean
  error: string | null
}>()

const emit = defineEmits<{
  registrarse: [datos: DatosRegistro]
}>()

const errorLocal = ref<string | null>(null)

const campos: CampoFormularioAutenticacion[] = [
  {
    clave: 'nickname',
    etiqueta: 'Nickname',
    tipo: 'text',
    autocomplete: 'username',
    placeholder: 'Elegí tu nickname',
  },
  {
    clave: 'contrasena',
    etiqueta: 'Contraseña',
    tipo: 'password',
    autocomplete: 'new-password',
    placeholder: 'Creá una contraseña',
  },
  {
    clave: 'confirmarContrasena',
    etiqueta: 'Confirmar contraseña',
    tipo: 'password',
    autocomplete: 'new-password',
    placeholder: 'Repetí la contraseña',
  },
]

const valoresIniciales: ValoresFormularioAutenticacion = {
  nickname: '',
  contrasena: '',
  confirmarContrasena: '',
}

const mensajeError = computed(() => errorLocal.value ?? props.error)

function manejarEnvio(valores: ValoresFormularioAutenticacion) {
  if ((valores.contrasena ?? '') !== (valores.confirmarContrasena ?? '')) {
    errorLocal.value = 'Las contraseñas no coinciden'
    return
  }

  errorLocal.value = null

  emit('registrarse', {
    nickname: valores.nickname ?? '',
    contrasena: valores.contrasena ?? '',
  })
}
</script>

<template>
  <FormularioAutenticacion
    :campos="campos"
    :cargando="cargando"
    :error="mensajeError"
    :ruta-link="'/iniciar-sesion'"
    :subtitulo="'Creá una cuenta local para guardar tu progreso en este navegador.'"
    :texto-boton="'Crear cuenta'"
    :texto-link="'Iniciá sesión'"
    :texto-secundario="'¿Ya tenés cuenta?'"
    :titulo="'Crear cuenta'"
    :valores="valoresIniciales"
    @enviar="manejarEnvio"
  />
</template>
