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
    meta: { requiresAuth: true },
    component: () => import('@layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: 'dashboard/job-result',
        name: 'JobResults'
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
            name: 'ListUser',
            component: () => import('@pages/Dashboard/UserManagement/UserManagement.vue')
          },
          {
            path: 'register-user',
            name: 'RegisterUser',
            component: () => import('@pages/Dashboard/UserManagement/RegisterUser.vue')
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
      }
    ]
  },
  {
    path: '/policy',
    name: 'Policy',
    component: () => import('@pages/Policy.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@pages/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')

  if (isAuthenticated && ['Login', 'ForgotPassword', 'ResetPassword'].includes(String(to.name))) {
    next('/dashboard/job-result')
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
