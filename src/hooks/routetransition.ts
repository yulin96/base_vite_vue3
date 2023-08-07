import { ref } from 'vue'
import { useRoute } from 'vue-router'

import '../assets/css/transition-vue.css'

type TSlideType =
  | 'Slide'
  | 'SlideR'
  | 'Zoom'
  | 'FlipY'
  | 'FlipX'
  | 'CollapseX'
  | 'Collapse'
  | 'FilterBlur'
  | 'clipPathRound'
  | string

export const useRouteTransition = (transitionTypeName: TSlideType = 'Slide') => {
  const transitionName = ref('slideApp')
  const slideType = transitionTypeName

  const route = useRoute()
  watch(
    () => route.meta,
    (newVal, oldVal) => {
      if (newVal.transitionName) return (transitionName.value = newVal.transitionName)
      if (!newVal.index || !oldVal.index) return (transitionName.value = 'slideApp')
      if (newVal.index == oldVal.index) return (transitionName.value = 'FilterBlur')
      transitionName.value = newVal.index > oldVal.index ? slideType + '_right' : slideType + '_left'
    }
  )

  return { transitionName }
}
