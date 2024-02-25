import { ref } from 'vue'
import { useRoute } from 'vue-router'

import '../assets/css/transition-vue.css'

export const useRouteTransition = (name: RouteTransitionName = 'Slide') => {
  const transitionName = ref('slideApp')

  const route = useRoute()
  watch(
    () => route.meta.index,
    (newIndex, oldIndex) => {
      if (!newIndex || !oldIndex) return (transitionName.value = 'slideApp')
      if (newIndex === oldIndex) return (transitionName.value = 'FilterBlur')
      transitionName.value = name + (newIndex > oldIndex ? '-right' : '-left')
    },
  )

  return { transitionName }
}
