import { createRouter, createWebHistory } from 'vue-router'

import PaginaInicioSesion from '@/modules/auth/page/PaginaInicioSesion.vue'
import PaginaRegistro from '@/modules/auth/page/PaginaRegistro.vue'
import CatalogoView from '../modules/catalogo/component/CatalogoView.vue'
import HomeView from '@/modules/home/views/HomeView.vue'
import PaginaDetalleJuego from '@/modules/detalle-juego/page/PaginaDetalleJuego.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/iniciar-sesion', component: PaginaInicioSesion },
    { path: '/registro', component: PaginaRegistro },
    { path: '/games', component: CatalogoView },
    { path: '/games/:id', component: PaginaDetalleJuego },
  ],
})

export default router
