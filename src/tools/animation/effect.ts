import gsap from 'gsap'

export function registerButtonEffect() {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLDivElement
    const parent = target.parentElement as HTMLDivElement | null

    const ele = target?.hasAttribute('btn') ? target : parent?.hasAttribute('btn') ? parent : null

    if (ele) {
      gsap.fromTo(ele, { scale: 1, opacity: 1 }, { scale: 0.96, opacity: 0.9, duration: 0.1, yoyo: true, repeat: 1 })
    }
  })
}
