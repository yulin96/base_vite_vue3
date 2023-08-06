import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '~/views/Index.vue'
import Home from '~/views/Home.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: { title: '', index: 1, keepAlive: true },
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { title: '', index: 2, keepAlive: true },
    },
  ],
})

// router.beforeEach(async (to) => {})

// router.afterEach((to, from) => {})

export default router
