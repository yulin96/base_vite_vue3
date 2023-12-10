import { createRouter, createWebHashHistory } from 'vue-router'
import index from '~~/views/index.vue'

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
  component: () => import('~/components/v-not-found.vue'),
  meta: { index: 404 },
})

router.beforeEach(async (to, from) => {})

router.afterEach((to, from) => {})

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    keepAlive?: boolean

    index?: number
    transitionName?: string

    gsapName?: string

    [x: string]: string | number | boolean | undefined
  }
}

export default router
