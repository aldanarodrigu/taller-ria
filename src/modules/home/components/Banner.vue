<script setup lang="ts">
import hero from '@/assets/images/background-home.png'
</script>

<template>
  <section class="hero" :style="{ backgroundImage: `url(${hero})` }">
    <div class="hero-overlay" />
    <div class="hero-content">
      <h1 class="hero-title">
        Explorar<br />
        <span class="hero-title--accent">videojuegos</span>
      </h1>
      <div class="hero-search">
        <h1>Aca va barra de busqueda</h1>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 800px;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to right,
      rgba(8, 10, 15, 0.92) 0%,
      rgba(8, 10, 15, 0.5) 50%,
      rgba(8, 10, 15, 0.1) 100%
    ),
    linear-gradient(to top, rgba(8, 10, 15, 0.8) 0%, transparent 60%);
}

.hero-content {
  position: relative;
  z-index: 1;
  padding: 0 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 480px;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.1;
  text-transform: uppercase;
}

.hero-title--accent {
  color: var(--color-brand);
}
</style>
