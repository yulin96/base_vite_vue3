export const useSetFocus = () => {
  const focus = (name: string) => {
    const element = document.querySelector(`[f-${name}]`) as HTMLElement
    if (!element) return
    element.setAttribute('tabindex', '-1')
    element?.focus()
    setTimeout(() => {
      element.removeAttribute('tabindex')
    }, 200)
  }

  return { focus }
}
