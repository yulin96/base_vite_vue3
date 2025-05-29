import { registerGuards } from '@/router/guards'
import { createRouter, createWebHashHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
    }
  },
})

if (import.meta.hot) {
  handleHotUpdate(router)
}

router.addRoute({
  path: '/:pathMatch(.*)*',
  name: '404',
  redirect: '/',
  meta: { index: 404 },
})

registerGuards(router)

declare module 'vue-router' {
  interface RouteMeta {
    index?: number
    transitionName?: string
    needLogin?: boolean
    [x: string]: string | number | boolean | undefined
  }
}

export default router
