import { createRouter, createWebHashHistory } from 'vue-router'
import index from '~/views/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: { index: 10 },
    },
  ],
})

router.addRoute({
  path: '/:pathMatch(.*)*',
  name: '404',
  component: () => import('~/components/VNotFound.vue'),
  meta: { index: 404, keepAlive: true },
})

router.beforeEach(async (to, from) => {})

router.afterEach((to, from) => {})

declare module 'vue-router' {
  interface RouteMeta {
    index?: number
    title?: string
    transitionName?: string

    [x: string]: string | number | boolean | undefined
  }
}

export default router
