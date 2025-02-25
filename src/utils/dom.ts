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

export function detectionElements(num = 10) {
  const calcWidth = [10, (innerWidth - 10 - 10) / (num - 1)]
  const calcHeight = [10, (innerHeight - 10 - 10) / (num - 1)]

  const doms = new Set<Element | null>()
  for (let i = 0; i < num; i++) {
    const x = calcWidth[0] + calcWidth[1] * i
    const y = calcHeight[0] + calcHeight[1] * i
    const reciprocalY = calcHeight[0] + calcHeight[1] * (num - i - 1)
    doms.add(document.elementFromPoint(x, y)).add(document.elementFromPoint(x, reciprocalY))
  }
  doms.delete(null)

  return doms
}

export function loadScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`))
    document.head.appendChild(script)
  })
}
