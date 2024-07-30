import gsap from 'gsap'

export const registerButtonEffect = () => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLDivElement
    const parent = target.parentElement as HTMLDivElement | null

    const ele = target?.hasAttribute('btn') ? target : parent?.hasAttribute('btn') ? parent : null
    ele &&
      gsap
        .timeline()
        .to(ele, { scale: 0.9, duration: 0.18, autoAlpha: 0.8 })
        .to(ele, { scale: 1, duration: 0.18, autoAlpha: 1 })
  })
}
