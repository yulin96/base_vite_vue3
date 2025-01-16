import gsap from 'gsap'

export function boundsMove(element: HTMLDivElement, from: DOMRect, to: DOMRect) {
  return new Promise<HTMLDivElement>((resolve, reject) => {
    const fromElement = element.cloneNode(true) as HTMLDivElement

    const { left: fromLeft, top: fromTop, width: fromWidth, height: fromHeight } = from
    const { left: toLeft, top: toTop, width: toWidth, height: toHeight } = to

    fromElement.style.position = 'fixed'
    fromElement.style.left = fromLeft + 'px'
    fromElement.style.top = fromTop + 'px'
    fromElement.style.width = fromWidth + 'px'
    fromElement.style.height = fromHeight + 'px'
    fromElement.style.zIndex = '900001'
    document.body.appendChild(fromElement)

    const x = -(fromLeft - toLeft + (fromWidth - toWidth) / 2)
    const y = -(fromTop - toTop + (fromHeight - toHeight) / 2)
    const scale = toWidth / fromWidth
    console.log('scale', scale, x, y)

    gsap.to(fromElement, {
      scale: scale,
      x: x,
      y: y,
      duration: 1.2,
      ease: 'back.in',
      onComplete: () => {
        resolve(fromElement)
      },
    })
  })
}
