import { useScroll } from '@vueuse/core'

/**
 * A custom hook for handling slide functionality.
 * @param {Object} options - The options for the slide functionality.
 * @param {string} options.eleName - The name of the element to apply the slide functionality to.
 * @param {Function} [options.prev] - The function to be called when the previous slide action is triggered.
 * @param {Function} [options.next] - The function to be called when the next slide action is triggered.
 * @param {Function} [options.prevScroll] - The function to be called when scrolling to the previous slide.
 * @param {Function} [options.nextScroll] - The function to be called when scrolling to the next slide.
 * @param {number} [options.slideNumber=100] - The threshold number for triggering the slide action.
 */
export const useSlide = ({
  eleName,
  prev,
  next,
  prevScroll,
  nextScroll,
  slideNumber = 100,
}: {
  eleName: string
  prev?: () => void
  next?: () => void
  prevScroll?: (num: number) => void
  nextScroll?: (num: number) => void
  slideNumber?: number
}) => {
  const startMove = ref({ clientY: 0, once: true })

  onMounted(() => {
    const ele = document.querySelector(eleName) as HTMLDivElement | null
    if (!ele) return console.error('ele is not found')
    const { arrivedState, isScrolling } = useScroll(ele, { offset: { bottom: 0 } })

    let lock = false
    ele.addEventListener('touchstart', () => {
      lock = false
    })

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
          if (lock) return
          lock = true
          return startClientY > clientY ? next?.() : prev?.()
        }

        if (Math.abs(startClientY - clientY) < 20) return

        if (startClientY > clientY) {
          return nextScroll?.(Math.round(startClientY - clientY))
        } else if (startClientY < clientY) {
          return prevScroll?.(Math.round(startClientY - clientY))
        }
      }
    })

    ele.addEventListener('touchend', () => {
      startMove.value.clientY = 0
      startMove.value.once = true
      lock = false
    })
  })
}
