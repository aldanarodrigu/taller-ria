<script setup lang="ts">
import { useRouter } from 'vue-router'
import hero from '@/assets/images/background-home.png'

const router = useRouter()

function irACatalogo() {
  void router.push('/games')
}

function irANovedades() {
  const el = document.getElementById('novedades')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="hero" :style="{ backgroundImage: `url(${hero})` }">
    <div class="hero-overlay" />
    <div class="hero-content">
      <h1 class="hero-title">
        Encuentra tus<br />
        <span class="hero-title--accent">juegos favoritos</span>
      </h1>
      <p class="hero-subtitulo">
        Explora miles de títulos, guarda tus favoritos y descubre las últimas novedades.
      </p>
      <div class="hero-acciones">
        <button class="hero-btn hero-btn--primary" @click="irACatalogo">Empezar a explorar</button>
        <button class="hero-btn hero-btn--ghost" @click="irANovedades">Novedades</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 900px;
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
      to top,
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

.hero-subtitulo {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  max-width: 360px;
}

/* ── Botones ── */

.hero-acciones {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.hero-btn {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  letter-spacing: 0.3px;
  transition:
    background 0.2s,
    color 0.2s,
    border-color 0.2s,
    transform 0.15s;
}

.hero-btn:hover {
  transform: translateY(-2px);
}

.hero-btn--primary {
  background: var(--color-brand);
  color: var(--color-text);
}

.hero-btn--primary:hover {
  background: var(--color-brand-dark);
}

.hero-btn--ghost {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border-mid);
}

.hero-btn--ghost:hover {
  border-color: var(--color-brand);
  color: var(--color-brand);
}

/* ── Responsive ── */

@media (max-width: 640px) {
  .hero {
    height: 600px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
