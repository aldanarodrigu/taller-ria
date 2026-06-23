<script setup lang="ts">
import { useRouter } from 'vue-router'

import CabeceraDetalleJuego from '../component/CabeceraDetalleJuego.vue'
import DescripcionDetalleJuego from '../component/DescripcionDetalleJuego.vue'
import EstadoDetalleJuego from '../component/EstadoDetalleJuego.vue'
import PlataformasDetalleJuego from '../component/PlataformasDetalleJuego.vue'
import ResumenDetalleJuego from '../component/ResumenDetalleJuego.vue'
import TiendasDetalleJuego from '../component/TiendasDetalleJuego.vue'
import { useDetalleJuego } from '../composable/useDetalleJuego'

const router = useRouter()
const {
  detalle,
  detallePreparado,
  estaCargando,
  mensajeError,
  recargar,
} = useDetalleJuego()

function volverPaginaAnterior() {
  if (window.history.length > 1) {
    router.back()
    return
  }

  void router.push('/')
}
</script>

<template>
  <section class="pagina-detalle-juego">
    <header class="pagina-detalle-juego__encabezado">
      <div>
        <p class="pagina-detalle-juego__eyebrow">RAWG</p>
        <h1 class="pagina-detalle-juego__titulo">Detalle del juego</h1>
      </div>

      <div class="pagina-detalle-juego__acciones">
        <button
          type="button"
          class="pagina-detalle-juego__boton pagina-detalle-juego__boton--secundario"
          @click="volverPaginaAnterior"
        >
          Volver
        </button>
      </div>
    </header>

    <EstadoDetalleJuego
      v-if="estaCargando"
      mensaje="Estamos cargando la información del juego."
      titulo="Cargando detalle"
    />

    <EstadoDetalleJuego
      v-else-if="mensajeError"
      :mostrar-accion="true"
      :mensaje="mensajeError"
      texto-accion="Volver a intentar"
      titulo="No pudimos cargar el detalle"
      @accion="recargar"
    />

    <EstadoDetalleJuego
      v-else-if="!detalle || !detallePreparado"
      mensaje="No se encontró información del juego."
      titulo="Sin datos"
    />

    <div v-else class="pagina-detalle-juego__contenido">
      <CabeceraDetalleJuego v-bind="detallePreparado.cabecera" />

      <div class="pagina-detalle-juego__grilla">
        <ResumenDetalleJuego v-bind="detallePreparado.resumen" />
        <DescripcionDetalleJuego v-bind="detallePreparado.descripcion" />
        <PlataformasDetalleJuego :plataformas="detallePreparado.plataformas" />
        <TiendasDetalleJuego :tiendas="detallePreparado.tiendas" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.pagina-detalle-juego {
  display: grid;
  gap: 24px;
  padding: 24px;
}

.pagina-detalle-juego__encabezado {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.pagina-detalle-juego__acciones {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-end;
}

.pagina-detalle-juego__eyebrow {
  color: #8892a4;
  font-size: 13px;
}

.pagina-detalle-juego__titulo {
  margin-top: 4px;
  font-size: 36px;
}

.pagina-detalle-juego__boton {
  padding: 12px 16px;
  border-radius: 10px;
  font-weight: 700;
}

.pagina-detalle-juego__boton--secundario {
  border: 1px solid #2d3548;
  background: #0d0f14;
  color: #e2e8f0;
}

.pagina-detalle-juego__contenido,
.pagina-detalle-juego__grilla {
  display: grid;
  gap: 20px;
}

@media (max-width: 720px) {
  .pagina-detalle-juego {
    padding: 16px;
  }

  .pagina-detalle-juego__encabezado {
    align-items: flex-start;
    flex-direction: column;
  }

  .pagina-detalle-juego__acciones {
    width: 100%;
    justify-content: flex-start;
  }

  .pagina-detalle-juego__boton {
    width: 100%;
  }
}
</style>
