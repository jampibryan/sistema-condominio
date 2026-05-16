import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/recibos',
      name: 'recibos',
      component: () => import('../views/RecibosView.vue')
    },
    {
      path: '/propietarios',
      name: 'propietarios',
      component: () => import('../views/PropietariosView.vue')
    },
    {
      path: '/departamentos',
      name: 'departamentos',
      component: () => import('../views/DepartamentosView.vue')
    }
  ]
})

export default router
