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
        <h1>Detalle del juego</h1>
      </div>

      <div class="pagina-detalle-juego__acciones">
        <button type="button" class="pagina-detalle-juego__boton pagina-detalle-juego__boton--secundario" @click="volverPaginaAnterior">
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
  gap: 1.5rem;
  min-height: 100vh;
  padding: 1.5rem;
  background:
    linear-gradient(180deg, rgba(79, 70, 229, 0.08), transparent 24%),
    var(--color-bg);
}

.pagina-detalle-juego__encabezado {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.pagina-detalle-juego__acciones {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-end;
}

.pagina-detalle-juego__eyebrow {
  color: #b8c1d8;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.75rem;
}

.pagina-detalle-juego__encabezado h1 {
  margin-top: 0.25rem;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.8rem);
}

.pagina-detalle-juego__boton {
  padding: 0.8rem 1.2rem;
  border-radius: 999px;
  background: rgba(124, 58, 237, 0.18);
  border: 1px solid rgba(124, 58, 237, 0.45);
  color: var(--color-text);
  font-weight: 700;
}

.pagina-detalle-juego__boton--secundario {
  background: rgba(22, 27, 39, 0.8);
  border-color: var(--color-border-mid);
}

.pagina-detalle-juego__contenido,
.pagina-detalle-juego__grilla {
  display: grid;
  gap: 1.25rem;
}

@media (max-width: 720px) {
  .pagina-detalle-juego {
    padding: 1rem;
  }

  .pagina-detalle-juego__encabezado {
    align-items: flex-start;
    flex-direction: column;
  }

  .pagina-detalle-juego__acciones {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
