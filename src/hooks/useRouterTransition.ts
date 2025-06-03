import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useRouteTransition(transitionName: RouteTransitionName = 'slide') {
  import(`@/assets/css/transition/${transitionName}.css`).catch((err) => {
    console.error('Error loading transition CSS:', err)
  })

  const name = ref('fade')
  const route = useRoute()
  watch(
    () => route.meta,
    (to, from) => {
      if (to.transitionName) return (name.value = to.transitionName)

      const toMetaIndex = to.index || 0
      const fromMetaIndex = from.index || 0

      if (!toMetaIndex || !fromMetaIndex || toMetaIndex === fromMetaIndex) {
        name.value = 'fade'
      } else {
        name.value = transitionName + (toMetaIndex > fromMetaIndex ? '-right' : '-left')
      }
    },
  )

  return { name }
}
