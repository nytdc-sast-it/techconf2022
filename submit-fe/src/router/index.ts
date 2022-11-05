import {createRouter, createWebHistory} from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';

NProgress.configure({showSpinner: false}); // NProgress Configuration

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'submit',
      component: () => import('@/views/submit/index.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/submit/index.vue'),
    }
  ],
  scrollBehavior() {
    return {top: 0};
  },
});

export default router;
