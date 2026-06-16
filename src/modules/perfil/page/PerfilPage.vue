<script setup lang="ts">
import PerfilView from '../component/PerfilView.vue'
import { usePerfil } from '../composable/usePerfil'

const { borrador, cargando, error, exito, guardando, hidratarPerfil, perfil } = usePerfil()
</script>

<template>
  <PerfilView
    :borrador="borrador"
    :cargando="cargando"
    :error="error"
    :exito="exito"
    :guardando="guardando"
    :perfil="perfil"
    @recargar="hidratarPerfil"
  />
</template>
