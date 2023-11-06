import { createRouter, createWebHashHistory } from 'vue-router'
import index from '~/views/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: { index: 10, keepAlive: true },
    },
  ],
})

router.addRoute({
  path: '/:pathMatch(.*)*',
  name: '404',
  component: () => import('~/components/VNotFound'),
  meta: { index: 404, keepAlive: true },
})

router.beforeEach(async (to, from) => {})

router.afterEach((_, from) => {
  const fromName = from.name
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
