<script setup lang="ts">
import Navbar from '@/shared/components/Navbar.vue'
import HeroBanner from '@/modules/home/components/Banner.vue'
</script>

<template>
  <section class="home-module">
    <Navbar />
    <HeroBanner />
  </section>
</template>

<style scoped>
.home-module {
  width: 100%;
  min-height: 100vh;
  background: #0d0f14;
  overflow-x: hidden;
}
</style>
