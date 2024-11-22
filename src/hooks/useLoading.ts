import { computed, onDeactivated, onUnmounted, ref } from 'vue'

export function useLoading(imgList: string[], next?: () => void, delay: number = 300) {
  let sto: NodeJS.Timeout
  const progressValue = ref(0)

  const count = computed(() =>
    (progressValue.value / imgList.length) * 100 >= 100
      ? 100
      : (progressValue.value / imgList.length) * 100,
  )

  const start = () => {
    for (const img of imgList) {
      const image = new Image()
      image.src = img
      const load = () => {
        progressValue.value++

        if (count.value >= 100) {
          sto = setTimeout(() => {
            next !== undefined && next()
          }, delay)
        }
      }
      image.onload = load
      image.onerror = load
    }
  }

  onUnmounted(() => {
    clearTimeout(sto)
  })

  onDeactivated(() => {
    clearTimeout(sto)
  })

  return { count, start }
}

// 假的loading效果
export function useFixLoading(speed: number = 20) {
  const count = ref(0)

  const IntervalFun = setInterval(() => {
    count.value++
    count.value >= 100 && clearInterval(IntervalFun)
  }, speed)

  onUnmounted(() => {
    clearInterval(IntervalFun)
  })

  onDeactivated(() => {
    clearInterval(IntervalFun)
  })

  return { count }
}
