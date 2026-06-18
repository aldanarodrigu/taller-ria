import { createRouter, createWebHistory } from 'vue-router'

import CatalogoView from '../modules/catalogo/component/CatalogoView.vue'
import HomeView from '@/modules/home/views/HomeView.vue'
import BuscadorPage from '@/modules/buscador/page/BuscadorPage.vue'
import DetalleJuegoPage from '@/modules/detalle-juego/page/DetalleJuegoPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/games', component: CatalogoView },
    { path: '/games/:id', component: DetalleJuegoPage },
    { path: '/search', component: BuscadorPage },
  ],
})

export default router
