import { useScroll } from '@vueuse/core'

export const useSlide = (
  ele: HTMLElement,
  toUp?: Function | undefined,
  toDown?: Function | undefined,
  toUpIng?: Function | undefined,
  toDownIng?: Function | undefined,
  slideNumber = 100,
) => {
  const startMove = ref({ clientY: 0, once: true })
  const { arrivedState, isScrolling } = useScroll(ele, { offset: { bottom: 0 } })

  ele.addEventListener('touchmove', (t) => {
    const clientY = t.changedTouches[0].clientY
    if (isScrolling.value) startMove.value.clientY = clientY

    if (arrivedState.top || arrivedState.bottom) {
      if (startMove.value.once) {
        startMove.value.clientY = clientY
        startMove.value.once = false
      }

      const startClientY = startMove.value.clientY

      if (Math.abs(startClientY - clientY) > slideNumber) {
        if (t.cancelable) {
          t.preventDefault()
        }
        return startClientY > clientY ? toUp?.() : toDown?.()
      }

      if (Math.abs(startClientY - clientY) < 20) return

      if (startClientY > clientY) {
        return toUpIng?.(Math.round(startClientY - clientY))
      } else if (startClientY < clientY) {
        return toDownIng?.(Math.round(startClientY - clientY))
      }
    }
  })

  ele.addEventListener('touchend', () => {
    startMove.value.clientY = 0
    startMove.value.once = true
  })
}
