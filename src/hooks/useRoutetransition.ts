import '../assets/css/transition.css'

export const useRouteTransition = (transitionName: RouteTransitionName = 'Slide') => {
  document.documentElement.classList.add('cover')

  const name = ref('alpha')

  const route = useRoute()
  watch(
    () => route.meta.index,
    (newIndex, oldIndex) => {
      console.log(newIndex, oldIndex)

      if (!newIndex || !oldIndex) return (name.value = 'alpha')
      if (newIndex === oldIndex) return (name.value = 'alpha')
      name.value = transitionName + (newIndex > oldIndex ? '-right' : '-left')
    },
  )

  return { name }
}
