import { createRouter, createWebHistory } from 'vue-router';

export const routes = [
  {
    path: '/',
    component: () => import('@components/HelloWorld.vue'),
    // requiresAuth: true,
  },
  {
    path: '/dashboard',
    component: () => import('@pages/DashBoard.vue'),
    // requiresAuth: true,
  },
];

const router = createRouter({
  history: createWebHistory(), // Hoặc createWebHashHistory() nếu bạn cần
  routes,
});

export default router;
