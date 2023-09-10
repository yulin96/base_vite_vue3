import { createRouter, createWebHashHistory } from 'vue-router/auto'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
})

router.beforeEach(async (to, from) => { })

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

export default router
