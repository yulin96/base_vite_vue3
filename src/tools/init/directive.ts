import type { App } from 'vue'

export const registerDirective = (app: App<Element>) => {
  app.directive('focus', (el: HTMLElement) => el.focus())

  app.directive('long-press', (el: HTMLElement, binding) => {
    let timer: NodeJS.Timeout | null = null
    el.addEventListener('touchstart', () => {
      timer = setTimeout(
        () => {
          binding.value?.()
        },
        +(binding?.arg || 1000),
      )
    })

    el.addEventListener('touchend', () => {
      clearTimeout(timer!)
    })
  })
}
