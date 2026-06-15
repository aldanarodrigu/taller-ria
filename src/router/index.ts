import { createRouter, createWebHistory } from 'vue-router'

import CatalogoView from '../modules/catalogo/component/CatalogoView.vue'
import HomeView from '@/modules/home/views/HomeView.vue'
import PaginaDetalleJuego from '@/modules/detalle-juego/page/PaginaDetalleJuego.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/games', component: CatalogoView },
    { path: '/games/:id', component: PaginaDetalleJuego },
  ],
})

export default router
