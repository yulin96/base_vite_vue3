import router from '~/router'
import '../assets/css/transition.css'

export const useRouteTransition = (transitionName: RouteTransitionName = 'Slide') => {
  if (!(['slide'] as RouteTransitionName[]).includes(transitionName)) {
    // 🤯 全屏组件需要禁止滚动，禁止后可能会导致其他问题
    document.documentElement.classList.add('cover')
  }

  const name = ref('fade')

  router.beforeEach((to, from) => {
    const toMetaIndex = to.meta.index || 0
    const fromMetaIndex = from.meta.index || 0

    if (!toMetaIndex || !fromMetaIndex || toMetaIndex === fromMetaIndex) {
      name.value = 'fade'
    } else {
      name.value = transitionName + (toMetaIndex > fromMetaIndex ? '-right' : '-left')
    }
  })

  return { name }
}
