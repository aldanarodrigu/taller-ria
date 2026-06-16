<script setup lang="ts">
import Navbar from '@/shared/components/Navbar.vue'
import { useAutenticacion } from '@/modules/auth/composable/useAutenticacion'
import { generarAvatarSeedAleatorio } from '@/modules/auth/service/auth.service'

import PerfilView from '../component/PerfilView.vue'
import { usePerfil } from '../composable/usePerfil'
import type { DatosPerfilEditable } from '../type/perfil.types'

const { usuarioActual } = useAutenticacion()
const {
  actualizarBorrador,
  borrador,
  cargando,
  error,
  exito,
  guardando,
  guardarPerfil,
  hidratarPerfil,
  limpiarMensajes,
  perfil,
  restablecerBorrador,
} = usePerfil()

function manejarActualizacionBorrador(cambios: Partial<DatosPerfilEditable>) {
  limpiarMensajes()
  actualizarBorrador(cambios)
}

function manejarGeneracionAvatar() {
  limpiarMensajes()
  actualizarBorrador({ avatarSeed: generarAvatarSeedAleatorio() })
}
</script>

<template>
  <section class="pagina-perfil">
    <Navbar />

    <PerfilView
      :borrador="borrador"
      :cargando="cargando"
      :error="error"
      :exito="exito"
      :guardando="guardando"
      :nickname="usuarioActual?.nickname ?? ''"
      :perfil="perfil"
      @generar-avatar="manejarGeneracionAvatar"
      @actualizar-borrador="manejarActualizacionBorrador"
      @guardar="guardarPerfil"
      @limpiar-mensajes="limpiarMensajes"
      @recargar="hidratarPerfil"
      @restablecer="restablecerBorrador"
    />
  </section>
</template>

<style scoped>
.pagina-perfil {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(79, 70, 229, 0.16), transparent 28%),
    radial-gradient(circle at bottom right, rgba(124, 58, 237, 0.14), transparent 24%),
    linear-gradient(180deg, #090b10 0%, #0d0f14 100%);
}
</style>
