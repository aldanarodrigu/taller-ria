import { createRouter, createWebHistory } from 'vue-router'

const FavoritosPage = () => import('../modules/favoritos/page/FavoritosPage.vue')
const DetalleJuegoPage = () => import('../modules/detalle-juego/page/DetalleJuegoPage.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/favoritos',
    },
    {
      path: '/favoritos',
      name: 'favoritos',
      component: FavoritosPage,
    },
    {
      path: '/juegos/:id',
      name: 'detalle-juego',
      component: DetalleJuegoPage,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/favoritos',
    },
  ],
})

export default router
