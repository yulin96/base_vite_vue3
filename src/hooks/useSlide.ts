export const useSlide = (ele: HTMLElement, toUp?: Function | undefined, slideNumber = 100) => {
  const eleCanScroll = !ele ? false : ele.scrollHeight > ele.clientHeight

  const { arrivedState } = useScroll(ele, { offset: { bottom: 0 } })

  const startMove = ref({ clientX: 0, clientY: 0 })

  ele.addEventListener('touchstart', (t) => {
    const _start = () => {
      const { clientY, clientX } = t.changedTouches[0]
      startMove.value = { clientY, clientX }
    }

    if (!eleCanScroll || arrivedState.bottom) _start()
  })

  ele.addEventListener('touchmove', (t) => {
    const { clientY: startClientY } = startMove.value

    const _move = () => {
      const { clientY } = t.changedTouches[0]
      if ((!arrivedState.bottom || startClientY < clientY) && eleCanScroll) return

      if (startClientY - clientY > slideNumber) {
        toUp?.()
        t.preventDefault()
      }
    }

    if (!eleCanScroll || startClientY) return _move()
  })

  ele.addEventListener('touchend', () => {
    startMove.value = { clientX: 0, clientY: 0 }
  })
}
