import { animate } from 'motion'

export function registerButtonEffect() {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLDivElement
    const parent = target.parentElement as HTMLDivElement | null

    const ele = target?.hasAttribute('btn') ? target : parent?.hasAttribute('btn') ? parent : null

    if (ele) {
      animate(ele, { scale: [1, 0.9, 1], opacity: [1, 0.6, 1] }, { ease: 'easeOut', duration: 0.2 })
    }
  })
}
