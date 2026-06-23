<script setup lang="ts">
import Navbar from '@/shared/components/Navbar.vue'
import { useAutenticacion } from '@/modules/auth/composable/useAutenticacion'
import { generarAvatarSeedAleatorio } from '@/modules/auth/service/auth.service'
import { useFavoritosJuegos } from '@/shared/composable/useFavoritosJuegos'
import { useRouter } from 'vue-router'

import PerfilView from '../component/PerfilView.vue'
import { usePerfil } from '../composable/usePerfil'
import type { DatosPerfilEditable } from '../type/perfil.types'

const router = useRouter()
const { favoritos, toggleFavorito, usuarioActual } = useAutenticacion()
const {
  actualizarBorrador,
  borrador,
  cargando,
  error,
  exito,
  guardando,
  guardarPerfil,
  limpiarMensajes,
  perfil,
  restablecerBorrador,
} = usePerfil()
const {
  error: favoritosError,
  items: favoritosItems,
  loading: favoritosLoading,
} = useFavoritosJuegos(favoritos)

function manejarActualizacionBorrador(cambios: Partial<DatosPerfilEditable>) {
  limpiarMensajes()
  actualizarBorrador(cambios)
}

function manejarGeneracionAvatar() {
  limpiarMensajes()
  actualizarBorrador({ avatarSeed: generarAvatarSeedAleatorio() })
}

function manejarVolver() {
  if (window.history.length > 1) {
    router.back()
    return
  }

  void router.push('/')
}

function manejarSeleccionFavorito(id: number) {
  void router.push(`/games/${id}`)
}

function manejarToggleFavorito(id: number) {
  toggleFavorito(id)
}
</script>

<template>
  <section>
    <Navbar />

    <PerfilView
      :borrador="borrador"
      :cargando="cargando"
      :error="error"
      :exito="exito"
      :guardando="guardando"
      :nickname="usuarioActual?.nickname ?? ''"
      :perfil="perfil"
      :favoritos="favoritosItems"
      :favoritos-cargando="favoritosLoading"
      :favoritos-error="favoritosError"
      @generar-avatar="manejarGeneracionAvatar"
      @actualizar-borrador="manejarActualizacionBorrador"
      @guardar="guardarPerfil"
      @limpiar-mensajes="limpiarMensajes"
      @restablecer="restablecerBorrador"
      @seleccionar-favorito="manejarSeleccionFavorito"
      @toggle-favorito="manejarToggleFavorito"
      @volver="manejarVolver"
    />
  </section>
</template>
