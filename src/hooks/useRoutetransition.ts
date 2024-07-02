import '../assets/css/transition.css'

export const useRouteTransition = (transitionName: RouteTransitionName = 'Slide') => {
  document.documentElement.classList.add('cover')

  const name = ref('fade')

  const route = useRoute()
  watch(
    () => route.meta.index,
    (newIndex, oldIndex) => {
      if (!newIndex || !oldIndex) return (name.value = 'fade')
      if (newIndex === oldIndex) return (name.value = 'fade')
      name.value = transitionName + (newIndex > oldIndex ? '-right' : '-left')
    },
  )

  return { name }
}
