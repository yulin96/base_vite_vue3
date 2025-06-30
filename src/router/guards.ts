import type { Router } from 'vue-router'

export function registerGuards(router: Router) {
  router.beforeEach((to, from) => {})

  router.afterEach((to, from) => {
    if (typeof window._hmt !== 'undefined') {
      window._hmt.push(['_trackPageview', `${location.pathname}#${to.fullPath}`])
    }
  })
}

declare global {
  interface Window {
    _hmt?: any
  }
}
