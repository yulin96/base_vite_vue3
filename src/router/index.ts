import type { RouterTyped } from 'vue-router/auto'
import { createRouter, createWebHashHistory } from 'vue-router/auto'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
}) as RouterTyped

router.addRoute({
  path: '/:pathMatch(.*)*',
  name: '404',
  component: () => import('~/components/VNotFound'),
  meta: { index: 404, keepAlive: true },
})

router.beforeEach(async (to, from) => {})

router.afterEach((_, from) => {
  const fromName = from.meta.gsapName
  if (fromName && window[gsapAll]?.[fromName])
    setTimeout(() => {
      window[gsapAll]?.[fromName]?.revert()
      delete window[gsapAll]?.[fromName]
    }, 500)
})

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
