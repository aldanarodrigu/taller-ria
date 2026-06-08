import { createRouter, createWebHistory } from 'vue-router'

import CatalogoView from '../modules/catalogo/component/CatalogoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/games', component: CatalogoView },
  ],
})

export default router
