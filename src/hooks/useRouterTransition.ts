import { useMaskLoading } from '@/hooks'
import router from '@/router'
import { useTimeoutFn, useToggle } from '@vueuse/core'
import { ref } from 'vue'

export function useRouteTransition(transitionName: RouteTransitionName = 'slide') {
  import(`@/assets/css/transition/${transitionName}.css`).catch((err) => {
    console.error('Error loading transition CSS:', err)
  })

  const { createLoading, clearLoading } = useMaskLoading()
  const { start: startTimeout, stop: stopTimeout } = useTimeoutFn(createLoading, 600, {
    immediate: false,
  })
  const [isFirstLoad, setIsFirstLoad] = useToggle(true)

  const name = ref('fade')

  router.beforeEach((to, from) => {
    if (!isFirstLoad.value && to.name !== from.name) {
      startTimeout()
    }

    if (to.meta.transitionName) {
      name.value = to.meta.transitionName
      return
    }

    const toMetaIndex = to.meta.index || 0
    const fromMetaIndex = from.meta.index || 0

    if (!toMetaIndex || !fromMetaIndex || toMetaIndex === fromMetaIndex) {
      name.value = 'fade'
    } else {
      name.value = transitionName + (toMetaIndex > fromMetaIndex ? '-right' : '-left')
    }
  })

  const isReady = () => {
    setIsFirstLoad(false)

    stopTimeout()
    clearLoading()
  }

  return { name, isReady }
}
