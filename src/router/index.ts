import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { type _RouterTyped } from 'unplugin-vue-router/types'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
})

router.addRoute({
  path: '/:pathMatch(.*)*',
  name: '404',
  component: () => import('~/components/v-not-found.vue'),
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
