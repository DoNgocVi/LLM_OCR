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
        redirect: 'dashboard/job-result'
      },
      {
        path: 'job-result',
        component: () => import('@pages/Dashboard/JobResults.vue')
      },
      {
        path: 'usage-data',
        component: () => import('@pages/Dashboard/UsageData.vue')
      },
      {
        path: 'user-management',
        redirect: '/dashboard/user-management/list-user',
        component: () => import('@pages/Dashboard/UserManagement/UserLayout.vue'),
        children: [
          {
            path: 'list-user',
            component: () => import('@pages/Dashboard/UserManagement/UserManagement.vue'),
          },
          {
            path: 'register-user',
            component: () => import('@pages/Dashboard/UserManagement/RegisterUser.vue'),
          }
        ]
      },
      {
        path: 'setting',
        component: () => import('@pages/Dashboard/Setting.vue')
      },
      {
        path: 'company-information',
        component: () => import('@pages/Dashboard/CompanyInformation.vue')
      },
      {
        path: '/my-account',
        component: () => import('@pages/Dashboard/MyAccount.vue')
      }
    ]
  },
  {
    path: '/policy',
    name: 'Policy',
    component: () => import('@pages/Policy.vue') // Chỉ định trang 404
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
