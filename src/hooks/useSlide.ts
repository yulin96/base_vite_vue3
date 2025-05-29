import { useScroll } from '@vueuse/core'
import { v4 } from 'uuid'
import { onActivated, onBeforeUnmount, onDeactivated, onMounted, readonly, ref, useTemplateRef, watch } from 'vue'

interface ISlideOptions {
  prev?: () => void
  next?: () => void
  /** ### 向上滑动回调 */
  prevScroll?: (distance: number) => void
  /** ### 向下滑动回调 */
  nextScroll?: (distance: number) => void
  /** ### 滑动距离阈值，默认为100 */
  slideNumber?: number
  /** ### 鼠标滚轮阈值，默认为60 */
  wheelThreshold?: number
  /** ### 滑动最小距离，默认为20 */
  minSlideDistance?: number
}

/**
 * 使用滑动的自定义钩子函数
 * @param options - 钩子函数选项
 * @param options.prev - 上一个滑动的回调函数
 * @param options.next - 下一个滑动的回调函数
 * @param options.prevScroll - 向上滑动的回调函数
 * @param options.nextScroll - 向下滑动的回调函数
 * @param options.slideNumber - 滑动距离的阈值，默认为100
 * @param options.wheelThreshold - 鼠标滚轮阈值，默认为60
 * @param options.minSlideDistance - 滑动最小距离，默认为20
 */
export function useSlide({
  prev,
  next,
  prevScroll,
  nextScroll,
  slideNumber = 100,
  wheelThreshold = 60,
  minSlideDistance = 20,
}: ISlideOptions = {}) {
  // 触摸状态管理
  const touchState = ref({
    startY: 0,
    isTracking: false,
    isLocked: false,
  })

  const key = v4()
  const ele = useTemplateRef<HTMLDivElement>(key)
  const { arrivedState } = useScroll(ele, { offset: { bottom: 0 } })

  // 重置触摸状态
  const resetTouchState = () => {
    touchState.value = {
      startY: 0,
      isTracking: false,
      isLocked: false,
    }
  }

  // 监听滚动状态变化，重置触摸状态
  watch([() => arrivedState.top, () => arrivedState.bottom], resetTouchState, { flush: 'pre' })

  // 触摸开始处理
  const handleTouchStart = (event: TouchEvent) => {
    if (!ele.value || !event.touches?.[0]) return

    touchState.value.isLocked = false
    touchState.value.isTracking = false
  }

  // 触摸移动处理
  const handleTouchMove = (event: TouchEvent) => {
    if (!ele.value || !event.changedTouches?.[0]) return

    const currentY = event.changedTouches[0].pageY
    const element = ele.value

    // 检查是否在边界位置
    const isAtTop = arrivedState.top || element.scrollTop <= 0
    const isAtBottom = arrivedState.bottom

    if (!isAtTop && !isAtBottom) return

    // 初始化跟踪
    if (!touchState.value.isTracking) {
      touchState.value.startY = currentY
      touchState.value.isTracking = true
      return
    }

    const deltaY = touchState.value.startY - currentY
    const absDeltaY = Math.abs(deltaY)

    // 如果滑动距离太小，忽略
    if (absDeltaY < minSlideDistance) return

    // 达到阈值时触发页面切换
    if (absDeltaY > slideNumber) {
      if (touchState.value.isLocked) return

      touchState.value.isLocked = true

      // 阻止默认行为
      if (event.cancelable) {
        event.preventDefault()
      }

      // 向下滑动（deltaY < 0）触发prev，向上滑动（deltaY > 0）触发next
      if (deltaY > 0) {
        next?.()
      } else {
        prev?.()
      }
      return
    }

    // 触发滚动回调
    if (deltaY > 0) {
      nextScroll?.(Math.round(absDeltaY))
    } else {
      prevScroll?.(Math.round(absDeltaY))
    }
  }

  // 触摸结束处理
  const handleTouchEnd = () => {
    resetTouchState()
  }

  // 鼠标滚轮处理
  const handleWheel = (event: WheelEvent) => {
    if (!ele.value) return

    const element = ele.value
    const { deltaY } = event

    // 向上滚轮且在顶部
    if (deltaY < -wheelThreshold && element.scrollTop === 0) {
      prev?.()
      return
    }

    // 向下滚轮且在底部
    const isAtBottom = Math.ceil(element.scrollTop) + Math.ceil(element.clientHeight) + 2 >= element.scrollHeight
    if (deltaY > wheelThreshold && isAtBottom) {
      next?.()
    }
  }

  // 事件监听器管理
  const eventOptions = { passive: false }

  const addEventListeners = () => {
    if (!ele.value) return

    const element = ele.value
    element.addEventListener('touchstart', handleTouchStart, eventOptions)
    element.addEventListener('touchmove', handleTouchMove, eventOptions)
    element.addEventListener('touchend', handleTouchEnd, eventOptions)
    element.addEventListener('wheel', handleWheel, eventOptions)
  }

  const removeEventListeners = () => {
    if (!ele.value) return

    const element = ele.value
    element.removeEventListener('touchstart', handleTouchStart)
    element.removeEventListener('touchmove', handleTouchMove)
    element.removeEventListener('touchend', handleTouchEnd)
    element.removeEventListener('wheel', handleWheel)
  }

  // 生命周期管理
  onMounted(() => {
    addEventListeners()
  })

  onActivated(() => {
    addEventListeners()
  })

  onBeforeUnmount(() => {
    removeEventListeners()
  })

  onDeactivated(() => {
    resetTouchState()
    removeEventListeners()
  })

  return {
    key,
    touchState: readonly(touchState),
    arrivedState,
    resetTouchState,
  }
}
