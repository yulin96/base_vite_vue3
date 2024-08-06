/**
 * 设置焦点到指定元素。
 * @param name - 元素的属性名。
 */
export function setFocus(name: string): void {
  const element = document.querySelector(`[${name}]`) as HTMLElement
  if (!element) return
  element.setAttribute('tabindex', '-1')
  element?.focus()
  setTimeout(() => {
    element?.removeAttribute('tabindex')
  }, 200)
}
