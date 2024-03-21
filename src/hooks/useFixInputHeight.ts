import { useDocumentVisibility } from '@vueuse/core'
import { watch } from 'vue'

export const useFixInput = (el: HTMLElement): void => {
  const visibility = useDocumentVisibility()
  watch(visibility, (e) => {
    if (e == 'visible') {
      el.focus()
      el.blur()
    }
  })
}
