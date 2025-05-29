import type { Router } from 'vue-router'

export function registerGuards(router: Router) {
  router.beforeEach((to, from) => {
    console.log(to, from)
  })

  router.afterEach((to, from) => {})
}
