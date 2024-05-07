import { useDocumentVisibility } from '@vueuse/core'

export const useFixInput = (el: HTMLElement): void => {
  const visibility = useDocumentVisibility()
  watch(visibility, (e) => {
    if (e == 'visible') {
      el.focus()
      el.blur()
    }
  })
}
