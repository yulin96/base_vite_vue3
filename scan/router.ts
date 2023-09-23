import { createRouter, createWebHashHistory,  } from 'vue-router'
import index from './views/index.vue'

const router2 = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: { title: '', index: 10, keepAlive: true },
    },
  ],
})

router2.beforeEach(async (to, from) => {})

// router.afterEach((to, from) => {})

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    keepAlive?: boolean

    index?: number
    transitionName?: string

    [x: string]: string | number | boolean | undefined
  }
}

export default router2
