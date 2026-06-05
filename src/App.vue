<script setup lang="ts"></script>

<template>
  <div class="app-shell">
    <header class="app-shell__header">
      <div class="brand">
        <span class="brand__mark">RIA</span>
        <div>
          <p class="brand__eyebrow">Interactive Lab</p>
          <h1 class="brand__title">Nexus Control</h1>
        </div>
      </div>

      <nav class="app-shell__nav" aria-label="Navegación principal">
        <RouterLink class="nav-chip" to="/favoritos">Favoritos</RouterLink>
        <RouterLink class="nav-chip" to="/juegos/1">Detalle juego</RouterLink>
      </nav>
    </header>

    <main class="app-shell__main">
      <RouterView />
    </main>
  </div>
</template>

<style>
:root {
  color-scheme: dark;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.5;
  font-weight: 400;
  background:
    radial-gradient(circle at top left, rgba(0, 229, 255, 0.16), transparent 28%),
    radial-gradient(circle at top right, rgba(147, 51, 234, 0.12), transparent 24%),
    linear-gradient(180deg, #07111f 0%, #04070d 100%);
  color: #e5f4ff;
}

html,
body,
#app {
  min-height: 100%;
}

body {
  margin: 0;
  min-width: 320px;
  background:
    radial-gradient(circle at top left, rgba(0, 229, 255, 0.16), transparent 28%),
    radial-gradient(circle at top right, rgba(147, 51, 234, 0.12), transparent 24%),
    linear-gradient(180deg, #07111f 0%, #04070d 100%);
}

* {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

.app-shell {
  min-height: 100vh;
  padding: 24px;
}

.app-shell__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 24px;
  background: rgba(5, 12, 24, 0.72);
  backdrop-filter: blur(18px);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.brand__mark {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 16px;
  background: linear-gradient(135deg, #00e5ff, #7c3aed);
  color: #04111f;
  font-weight: 900;
  letter-spacing: 0.08em;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 16px 30px rgba(0, 229, 255, 0.25);
}

.brand__eyebrow {
  margin: 0;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.24em;
  color: #7dd3fc;
}

.brand__title {
  margin: 0.1rem 0 0;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
}

.app-shell__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.nav-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  padding: 0.7rem 1rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.7);
  color: #d8f3ff;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    background-color 160ms ease,
    box-shadow 160ms ease;
}

.nav-chip:hover,
.nav-chip.router-link-active {
  transform: translateY(-1px);
  border-color: rgba(0, 229, 255, 0.45);
  background: linear-gradient(135deg, rgba(0, 229, 255, 0.16), rgba(124, 58, 237, 0.16));
  box-shadow: 0 0 0 1px rgba(0, 229, 255, 0.12), 0 12px 30px rgba(0, 229, 255, 0.12);
}

.app-shell__main {
  margin-top: 1.25rem;
  padding: 1.25rem;
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 28px;
  background: rgba(4, 9, 18, 0.68);
  backdrop-filter: blur(18px);
  box-shadow: 0 26px 80px rgba(0, 0, 0, 0.38);
}

@media (max-width: 820px) {
  .app-shell {
    padding: 16px;
  }

  .app-shell__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .app-shell__header {
    align-items: flex-start;
  }
}
</style>
