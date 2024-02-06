import { ref } from 'vue'
import { useRoute } from 'vue-router'

import '../assets/css/transition-vue.css'

type RouteTransitionName =
  | 'Slide'
  | 'FilterBlur'
  | 'Zoom'
  | 'FlipY'
  | 'CollapseY'
  | 'DiagonallyFadeOut'
  | 'leftFlyOut'
  | 'slidePage'
  | 'slide-cover'
  | (string & {})

export const useRouteTransition = (transitionTypeName: RouteTransitionName = 'Slide') => {
  const transitionName = ref('slideApp')
  const slideType = transitionTypeName

  const route = useRoute()
  watch(
    () => route.meta,
    (newVal, oldVal) => {
      if (newVal.transitionName) return (transitionName.value = newVal.transitionName)
      if (!newVal.index || !oldVal.index) return (transitionName.value = 'slideApp')
      if (newVal.index == oldVal.index) return (transitionName.value = 'FilterBlur')
      transitionName.value = newVal.index > oldVal.index ? slideType + '-right' : slideType + '-left'
    },
  )

  return { transitionName }
}
