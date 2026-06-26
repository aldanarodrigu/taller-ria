<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { UserIcon } from '@heroicons/vue/24/outline'
import { useRoute, useRouter } from 'vue-router'

import { useFavoritosJuegos } from '@/shared/composable/useFavoritosJuegos'
import FavoritosModal from '@/shared/components/FavoritosModal.vue'
import AvatarDiceBear from '@/shared/components/AvatarDiceBear.vue'
import { useAutenticacion } from '@/modules/auth/composable/useAutenticacion'

defineOptions({
  name: 'AppNavbar',
})

interface NavItem {
  action?: 'favoritos'
  label: string
  route?: string
}

const router = useRouter()
const route = useRoute()
const { cerrarSesion, favoritos, hidratarSesion, inicializado, toggleFavorito, usuarioActual } = useAutenticacion()
const menuAbierto = ref(false)
const menuNavAbierto = ref(false)
const modalFavoritosAbierto = ref(false)
const contenedorPerfil = ref<HTMLElement | null>(null)
const favoritosHabilitados = computed(() => modalFavoritosAbierto.value && Boolean(usuarioActual.value))
const navItems = computed<NavItem[]>(() => [
  { label: 'Inicio', route: '/' },
  { label: 'Juegos', route: '/games' },
  { label: 'Generos' },
  { label: 'Plataformas' },
  { label: 'Estadisticas', route: '/estadisticas' },
  ...(usuarioActual.value ? [{ label: 'Favoritos', action: 'favoritos' as const }] : []),
])
const {
  error: favoritosError,
  items: favoritosItems,
  loading: favoritosLoading,
  recargar: recargarFavoritos,
} = useFavoritosJuegos(favoritos, favoritosHabilitados)

function cerrarMenu(): void {
  menuAbierto.value = false
}

function toggleMenuNav(): void {
  menuNavAbierto.value = !menuNavAbierto.value
}

function cerrarFavoritos(): void {
  modalFavoritosAbierto.value = false
}

function abrirFavoritos(): void {
  if (!usuarioActual.value) {
    return
  }

  cerrarMenu()
  modalFavoritosAbierto.value = true
}

function navegar(item: NavItem): void {
  menuNavAbierto.value = false
  if (item.action === 'favoritos') {
    abrirFavoritos()
    return
  }

  if (item.route) {
    void router.push(item.route)
  }
}

function esNavActivo(item: NavItem): boolean {
  if (item.action === 'favoritos') {
    return modalFavoritosAbierto.value
  }

  if (!item.route) {
    return false
  }

  if (item.route === '/games') {
    return route.path === '/games' || route.path.startsWith('/games/')
  }

  return route.path === item.route
}

function alternarMenuPerfil(): void {
  if (!inicializado.value) {
    hidratarSesion()
  }

  if (!usuarioActual.value) {
    cerrarMenu()
    void router.push('/iniciar-sesion')
    return
  }

  menuAbierto.value = !menuAbierto.value
}

function irAPerfil(): void {
  cerrarMenu()
  void router.push('/perfil')
}

function abrirDetalleFavorito(id: number): void {
  cerrarFavoritos()
  void router.push(`/games/${id}`)
}

function toggleFavoritoDesdeModal(id: number): void {
  toggleFavorito(id)
}

function salirDeLaSesion(): void {
  cerrarSesion()
  cerrarFavoritos()
  cerrarMenu()
  void router.push('/iniciar-sesion')
}

function manejarClickFuera(evento: MouseEvent): void {
  const objetivo = evento.target

  if (!(objetivo instanceof Node)) {
    return
  }

  if (!contenedorPerfil.value?.contains(objetivo)) {
    cerrarMenu()
  }
}

function manejarTeclaEscape(evento: KeyboardEvent): void {
  if (evento.key === 'Escape') {
    cerrarMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', manejarClickFuera)
  document.addEventListener('keydown', manejarTeclaEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', manejarClickFuera)
  document.removeEventListener('keydown', manejarTeclaEscape)
})
</script>

<template>
  <header class="header">
    <div class="header-logo">gameXplorer</div>

    <nav class="header-nav" :class="{ 'header-nav--abierto': menuNavAbierto }">
      <a
        v-for="item in navItems"
        :key="item.label"
        href="#"
        class="nav-link"
        :class="{ 'nav-link--active': esNavActivo(item) }"
        @click.prevent="navegar(item)"
      >
        {{ item.label }}
      </a>
    </nav>

    <div class="header-search">
      <!-- aca el buscador -->
    </div>

    <button
      class="header-hamburguesa"
      aria-label="Abrir menú"
      @click="toggleMenuNav"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div ref="contenedorPerfil" class="header-perfil">
      <button
        class="perfil-button"
        :aria-expanded="menuAbierto"
        :aria-label="usuarioActual ? 'Abrir menu de usuario' : 'Ir a iniciar sesion'"
        @click.stop="alternarMenuPerfil"
      >
        <span v-if="usuarioActual" class="perfil-nickname">{{ usuarioActual.nickname }}</span>
        <AvatarDiceBear
          v-if="usuarioActual"
          class="perfil-avatar"
          :seed="usuarioActual.perfil.avatarSeed"
          :size="28"
          alt="Avatar del usuario"
        />
        <UserIcon v-else class="perfil-icon" />
      </button>

      <Transition name="menu-perfil">
        <div v-if="menuAbierto && usuarioActual" class="perfil-menu">
          <button class="perfil-menu__item" type="button" @click="irAPerfil">Perfil</button>
          <button class="perfil-menu__item perfil-menu__item--salir" type="button" @click="salirDeLaSesion">
            Cerrar sesion
          </button>
        </div>
      </Transition>
    </div>

    <FavoritosModal
      :abierto="modalFavoritosAbierto"
      :error="favoritosError"
      :items="favoritosItems"
      :loading="favoritosLoading"
      @cerrar="cerrarFavoritos"
      @recargar="recargarFavoritos"
      @seleccionar="abrirDetalleFavorito"
      @toggle-favorito="toggleFavoritoDesdeModal"
    />
  </header>
</template>

<style scoped>
.header {
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0 1.5rem;
  height: 60px;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  font-family: var(--font-body);
  max-width: 100%;
}

.header-logo {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: 0.5px;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
}

.nav-link {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 6px;
  transition:
    color 0.2s,
    background 0.2s;
  white-space: nowrap;
  letter-spacing: 0.2px;
  position: relative;
}

.nav-link:hover {
  color: var(--color-text-hover);
  background: var(--color-bg-hover);
}

.nav-link--active {
  color: var(--color-text);
  background: var(--color-bg-hover);
}

.nav-link--active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: var(--color-brand);
  border-radius: 2px;
}

.header-search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 6px 12px;
  width: 180px;
  transition: border-color 0.2s;
}

.header-search:focus-within {
  border-color: var(--color-border-focus);
}

.header-perfil {
  position: relative;
  z-index: 30;
  margin-left: auto;
}

.perfil-button {
  min-height: 32px;
  padding: 0.125rem 0;
  border-radius: 0;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  cursor: pointer;
  transition:
    color 0.2s,
    transform 0.2s;
}

.perfil-button:hover {
  transform: translateY(-1px);
}

.perfil-nickname {
  max-width: 9rem;
  overflow: hidden;
  color: var(--color-text);
  font-size: 0.88rem;
  font-weight: 700;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.perfil-icon {
  width: 16px;
  height: 16px;
  color: var(--color-text);
}

.perfil-avatar {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  overflow: hidden;
  border: 2px solid var(--color-border-mid);
  transition: border-color 0.2s;
}

.perfil-button:hover .perfil-avatar {
  border-color: var(--color-brand);
}

.perfil-menu {
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;
  z-index: 40;
  min-width: 11rem;
  padding: 0.45rem;
  border: 1px solid var(--color-border-mid);
  border-radius: 14px;
  background: rgba(14, 18, 27, 0.96);
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(14px);
}

.perfil-menu__item {
  display: block;
  width: 100%;
  padding: 0.75rem 0.85rem;
  border-radius: 10px;
  color: var(--color-text);
  font-size: 0.92rem;
  text-align: left;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.perfil-menu__item:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-hover);
}

.perfil-menu__item--salir {
  color: #fca5a5;
}

.perfil-menu__item--salir:hover {
  background: rgba(127, 29, 29, 0.22);
  color: #fecaca;
}

.menu-perfil-enter-active,
.menu-perfil-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
  transform-origin: top right;
}

.menu-perfil-enter-from,
.menu-perfil-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.96);
}

.menu-perfil-enter-to,
.menu-perfil-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

@media (max-width: 720px) {
  .perfil-button {
    padding-left: 0.55rem;
  }

  .perfil-nickname {
    max-width: 6rem;
    font-size: 0.82rem;
  }
}

.header-hamburguesa {
  display: none;
}

@media (max-width: 640px) {
  .header {
    flex-wrap: wrap;
    height: auto;
    padding: 10px 16px;
    gap: 8px;
  }

  .header-logo {
    flex: 1;
  }

  .header-search {
    display: none;
  }

  .header-perfil {
    margin-left: 0;
  }

  .header-hamburguesa {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }

  .header-hamburguesa span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--color-text);
    border-radius: 2px;
    transition: transform 0.2s, opacity 0.2s;
  }

  .header-nav {
    display: none;
  }

  .header-nav--abierto {
    display: flex;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    flex-direction: column;
    padding: 8px 0 12px;
    gap: 2px;
    background: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
    z-index: 50;
  }
}
</style>
