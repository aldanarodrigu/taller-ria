<script setup lang="ts">
import { ref } from 'vue'
import { UserIcon } from '@heroicons/vue/24/outline'

interface NavItem {
  label: string
  href: string
  active: boolean
}

const navItems = ref<NavItem[]>([
  //ref hace que una lista sea reactiva
  { label: 'Inicio', href: '#', active: true },
  { label: 'Juegos', href: '#', active: false },
  { label: 'Géneros', href: '#', active: false },
  { label: 'Plataformas', href: '#', active: false },
  { label: 'Favoritos', href: '#', active: false },
])

function setActive(selected: NavItem): void {
  ///se ejecuta cuando el usuario hace clic
  navItems.value.forEach((item) => (item.active = item.label === selected.label))
}
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

    <div class="header-perfil">
      <button class="perfil-button" aria-label="Perfil de usuario">
        <UserIcon class="perfil-icon" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
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
</style>
