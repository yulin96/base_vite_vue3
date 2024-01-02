export const useSetFocus = () => {
  const setFocus = (name: string) => {
    const element = document.querySelector(`[${name}]`) as HTMLElement
    if (!element) return
    element.setAttribute('tabindex', '-1')
    element?.focus()
    setTimeout(() => {
      element.removeAttribute('tabindex')
    }, 200)
  }

  return { setFocus }
}
