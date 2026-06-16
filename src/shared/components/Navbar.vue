<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { UserIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

import { useAutenticacion } from '@/modules/auth/composable/useAutenticacion'

defineOptions({
  name: 'AppNavbar',
})

interface NavItem {
  label: string
  href: string
  active: boolean
}

const navItems = ref<NavItem[]>([
  { label: 'Inicio', href: '#', active: true },
  { label: 'Juegos', href: '#', active: false },
  { label: 'Generos', href: '#', active: false },
  { label: 'Plataformas', href: '#', active: false },
  { label: 'Favoritos', href: '#', active: false },
])

const router = useRouter()
const { cerrarSesion, hidratarSesion, inicializado, usuarioActual } = useAutenticacion()
const menuAbierto = ref(false)
const contenedorPerfil = ref<HTMLElement | null>(null)

function setActive(selected: NavItem): void {
  navItems.value.forEach((item) => (item.active = item.label === selected.label))
}

function cerrarMenu(): void {
  menuAbierto.value = false
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

function salirDeLaSesion(): void {
  cerrarSesion()
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

    <nav class="header-nav">
      <a
        v-for="item in navItems"
        :key="item.label"
        :href="item.href"
        class="nav-link"
        :class="{ 'nav-link--active': item.active }"
        @click.prevent="setActive(item)"
      >
        {{ item.label }}
      </a>
    </nav>

    <div class="header-search">
      <!-- aca el buscador -->
    </div>

    <div ref="contenedorPerfil" class="header-perfil">
      <button
        class="perfil-button"
        :aria-expanded="menuAbierto"
        :aria-label="usuarioActual ? 'Abrir menu de usuario' : 'Ir a iniciar sesion'"
        @click.stop="alternarMenuPerfil"
      >
        <UserIcon class="perfil-icon" />
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-brand), var(--color-brand-alt));
  border: 2px solid var(--color-border-mid);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s;
}

.perfil-button:hover {
  border-color: var(--color-brand);
}

.perfil-icon {
  width: 16px;
  height: 16px;
  color: var(--color-text);
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
</style>
