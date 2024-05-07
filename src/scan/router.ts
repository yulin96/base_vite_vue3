import { createRouter, createWebHashHistory } from 'vue-router'
import index from '~/scan/views/index.vue'

const scanRouter = createRouter({
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

scanRouter.addRoute({
  path: '/:pathMatch(.*)*',
  name: '404',
  component: () => import('~/components/NotFound.vue'),
  meta: { index: 404 },
})

scanRouter.beforeEach(async (to, from) => {})

scanRouter.afterEach((to, from) => {})

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

export { scanRouter }
