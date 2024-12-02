import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    component: () => import('@components/HelloWorld.vue')
  },
  {
    path: '/auth',
    component: () => import('@layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        component: () => import('@pages/Auth/Login.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('@layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@pages/Dashboard/Staff.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(), // Hoặc createWebHashHistory() nếu bạn cần
  routes
})

export default router
