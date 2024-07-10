import { useTimeoutFn } from '@vueuse/core'
import { useMaskLoading } from '~/hooks/useMaskLoading'
import router from '~/router'
import '../assets/css/transition.css'

export const useRouteTransition = (transitionName: RouteTransitionName = 'Slide') => {
  if (!(['slide'] as RouteTransitionName[]).includes(transitionName)) {
    // 🤯 全屏组件需要禁止滚动，禁止后可能会导致其他问题
    document.documentElement.classList.add('cover')
  }

  const { createLoading, clearLoading } = useMaskLoading()
  const { start: startTimeout, stop: stopTimeout } = useTimeoutFn(createLoading, 300, { immediate: false })
  const [isFirstLoad, setIsFirstLoad] = useToggle(true)

  const name = ref('fade')

  router.beforeEach((to, from) => {
    isFirstLoad.value ? setIsFirstLoad(false) : startTimeout()

    const toMetaIndex = to.meta.index || 0
    const fromMetaIndex = from.meta.index || 0

    if (!toMetaIndex || !fromMetaIndex || toMetaIndex === fromMetaIndex) {
      name.value = 'fade'
    } else {
      name.value = transitionName + (toMetaIndex > fromMetaIndex ? '-right' : '-left')
    }
  })

  const transitionEnter = () => {
    stopTimeout()
    clearLoading()
  }

  return { name, transitionEnter }
}
