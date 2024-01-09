import { useScroll } from '@vueuse/core'

interface ISlideOptions {
  eleName: string
  prev?: () => void
  next?: () => void
  prevScroll?: (num: number) => void
  nextScroll?: (num: number) => void
  slideNumber?: number
}

export const useSlide = ({ eleName, prev, next, prevScroll, nextScroll, slideNumber = 100 }: ISlideOptions) => {
  const startMove = ref({ pageY: 0, once: true })

  onMounted(() => {
    const ele = document.querySelector(eleName) as HTMLDivElement | null
    if (!ele) return console.error('ele is not found')
    const { arrivedState } = useScroll(ele, { offset: { bottom: 0 } })

    let lock = false
    ele.addEventListener('touchstart', (t) => {
      lock = false
    })

    ele.addEventListener('touchmove', (t) => {
      const pageY = t.changedTouches[0].pageY

      if (arrivedState.top || arrivedState.bottom || ele.scrollTop < 0) {
        if (startMove.value.once) {
          startMove.value.pageY = pageY
          startMove.value.once = false
        }

        if (Math.abs(startMove.value.pageY - pageY) > slideNumber) {
          if (lock) return
          lock = true
          if (t.cancelable) {
            t.preventDefault()
          }
          return startMove.value.pageY > pageY ? next?.() : prev?.()
        }

        if (Math.abs(startMove.value.pageY - pageY) < 20) return

        if (startMove.value.pageY > pageY) {
          return nextScroll?.(Math.round(startMove.value.pageY - pageY))
        } else if (startMove.value.pageY < pageY) {
          return prevScroll?.(Math.round(startMove.value.pageY - pageY))
        }
      }
    })

    ele.addEventListener('touchend', (e) => {
      startMove.value.pageY = 0
      startMove.value.once = true
      lock = false
    })
  })
}
