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
        name: 'Login',
        component: () => import('@pages/Auth/Login.vue')
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import('@pages/Auth/ForgotPassword.vue')
      },
      {
        path: 'reset-password',
        name: 'ResetPassword',
        component: () => import('@pages/Auth/ResetPassword.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@pages/Dashboard/Staff.vue')
      },
      {
        path: '/my-account',
        component: () => import('@pages/Dashboard/MyAccount.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@pages/NotFound.vue') // Chỉ định trang 404
  }
]

const router = createRouter({
  history: createWebHistory(), // Hoặc createWebHashHistory() nếu bạn cần
  routes
})

export default router
