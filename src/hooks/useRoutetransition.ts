import { ref } from 'vue'
import { useRoute } from 'vue-router'
import '../assets/css/transition-vue.css'

export const useRouteTransition = (transitionName: RouteTransitionName = 'Slide') => {
  const name = ref('slideApp')

  const route = useRoute()
  watch(
    () => route.meta.index,
    (newIndex, oldIndex) => {
      if (!newIndex || !oldIndex) return (name.value = 'slideApp')
      if (newIndex === oldIndex) return (name.value = 'FilterBlur')
      name.value = transitionName + (newIndex > oldIndex ? '-right' : '-left')
    },
  )

  return { name }
}
