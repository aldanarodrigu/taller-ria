<script setup lang="ts">
import FormularioAutenticacion from './FormularioAutenticacion.vue'

import type {
  CampoFormularioAutenticacion,
  CredencialesInicioSesion,
  ValoresFormularioAutenticacion,
} from '../type/auth.types'

defineProps<{
  cargando: boolean
  error: string | null
}>()

const emit = defineEmits<{
  'iniciar-sesion': [credenciales: CredencialesInicioSesion]
}>()

const campos: CampoFormularioAutenticacion[] = [
  {
    clave: 'nickname',
    etiqueta: 'Nickname',
    tipo: 'text',
    autocomplete: 'username',
    placeholder: 'Ingresá tu nickname',
  },
  {
    clave: 'contrasena',
    etiqueta: 'Contraseña',
    tipo: 'password',
    autocomplete: 'current-password',
    placeholder: 'Ingresá tu contraseña',
  },
]

const valoresIniciales: ValoresFormularioAutenticacion = {
  nickname: '',
  contrasena: '',
}

function manejarEnvio(valores: ValoresFormularioAutenticacion) {
  emit('iniciar-sesion', {
    nickname: valores.nickname ?? '',
    contrasena: valores.contrasena ?? '',
  })
}
</script>

<template>
  <FormularioAutenticacion
    :campos="campos"
    :cargando="cargando"
    :error="error"
    :ruta-link="'/registro'"
    :subtitulo="'Entrá a tu cuenta local para seguir explorando tu biblioteca.'"
    :texto-boton="'Iniciar sesión'"
    :texto-link="'Registrate'"
    :texto-secundario="'¿No tenés cuenta?'"
    :titulo="'Bienvenido de nuevo'"
    :valores="valoresIniciales"
    @enviar="manejarEnvio"
  />
</template>
