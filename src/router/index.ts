import { createRouter, createWebHashHistory } from 'vue-router'
import index from '~/pages/index.vue'
import home from '~/pages/home.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    keepAlive?: boolean

    index?: number
    transitionName?: string

    [x: string]: string | number | boolean | undefined
  }
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: { title: '', index: 1, keepAlive: true },
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: { title: '', index: 2, keepAlive: true },
    },

    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('~/components/VNotFound'),
      meta: { index: 404, keepAlive: true },
    },
  ],
})

// router.beforeEach(async (to) => {})

// router.afterEach((to, from) => {})

export default router
