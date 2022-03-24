import { createRouter, createWebHistory } from 'vue-router'
import { AccountView, ContactView, CurriculumView, LoginView, NotFoundView } from '@/views';

const routes = [
  {
    path: '/',
    name: 'MyCV',
    component: CurriculumView
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactView
  },
  {
    path: '/account',
    name: 'Account',
    component: AccountView
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: LoginView
  },
  // redirect
  {
    path: '/login',
    redirect: '/auth/login'
  },
  // catchall 404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
