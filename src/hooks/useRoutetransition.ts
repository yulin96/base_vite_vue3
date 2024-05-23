import '../assets/css/transition.css'

export const useRouteTransition = (transitionName: RouteTransitionName = 'Slide') => {
  if (transitionName === 'slide-page') document.body.classList.add('slide-page')

  const name = ref('alpha')

  const route = useRoute()
  watch(
    () => route.meta.index,
    (newIndex, oldIndex) => {
      if (!newIndex || !oldIndex) return (name.value = 'alpha')
      if (newIndex === oldIndex) return (name.value = 'alpha')
      name.value = transitionName + (newIndex > oldIndex ? '-right' : '-left')
    },
  )

  return { name }
}
