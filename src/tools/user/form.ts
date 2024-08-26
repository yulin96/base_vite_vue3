export function setMark(name: string) {
  const dom = document.querySelector(name) as HTMLElement | null
  if (!dom) return

  dom.style.outline = '1px solid #C7253E'
  dom.addEventListener('focusin', () => dom.style.removeProperty('outline'), { once: true })
}
