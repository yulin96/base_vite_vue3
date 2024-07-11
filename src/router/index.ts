import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
    }
  },
})

router.addRoute({
  path: '/:pathMatch(.*)*',
  name: '404',
  component: () => import('~/components/NotFound.vue'),
  meta: { index: 404 },
})

router.beforeEach(async (to, from) => {})

router.afterEach((to, from) => {})

declare module 'vue-router' {
  interface RouteMeta {
    index?: number
    transitionName?: string
    [x: string]: string | number | boolean | undefined
  }
}

export default router
