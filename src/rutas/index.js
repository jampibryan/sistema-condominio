import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../vistas/DashboardView.vue'

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
      component: () => import('../vistas/RecibosView.vue')
    },
    {
      path: '/propietarios',
      name: 'propietarios',
      component: () => import('../vistas/PropietariosView.vue')
    },
    {
      path: '/departamentos',
      name: 'departamentos',
      component: () => import('../vistas/DepartamentosView.vue')
    }
  ]
})

export default router
