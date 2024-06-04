export const useSealTouch = (el: string, requiredTouches = 5) => {
  const canBeTouched = ref(true)
  const handleTouch = ref<(val: { x: number; y: number }[]) => any>()

  let sealTouches: { x: number; y: number }[] = []
  const touchStart = (e: TouchEvent) => {
    for (const touch of e.changedTouches) {
      sealTouches.push({ x: touch.clientX, y: touch.clientY })
    }

    if (sealTouches.length === requiredTouches) {
      handleTouch.value?.(sealTouches)
    }
  }

  const touchEnd = (e: TouchEvent) => {
    e.preventDefault()
    sealTouches = []
  }

  watch(
    canBeTouched,
    async (val) => {
      await nextTick()
      const sealWrapper = document.querySelector(el) as HTMLElement | null
      if (!sealWrapper) return alert('找不到元素')
      if (val) {
        sealWrapper?.addEventListener('touchstart', touchStart, false)
        sealWrapper?.addEventListener('touchend', touchEnd, false)
      } else {
        sealWrapper?.removeEventListener('touchstart', touchStart, false)
        sealWrapper?.removeEventListener('touchend', touchEnd, false)
      }
    },
    { immediate: true, flush: 'post' },
  )

  const resume = () => {
    canBeTouched.value = true
  }

  const pause = () => {
    canBeTouched.value = false
  }

  return { resume, pause, handleTouch }
}
