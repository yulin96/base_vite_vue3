export const useLoading = (loadingImgList: string[], next?: Function, delay: number = 300) => {
  let sto: number | any
  const count = ref<number>(0)
  let progressImg = 0
  const imgs = loadingImgList

  const start = () => {
    for (const img of imgs) {
      const image = new Image()
      image.src = img
      const loadFun = () => {
        progressImg++
        count.value = (progressImg / imgs.length) * 100 >= 100 ? 100 : (progressImg / imgs.length) * 100
        if (count.value >= 100) {
          sto = setTimeout(() => {
            next !== undefined && next()
          }, delay)
        }
      }
      image.onload = loadFun
      image.onerror = loadFun
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
export const useFixLoading = (speed: number = 20) => {
  const count = ref<number>(0)

  const Interval1 = setInterval(() => {
    count.value++
    count.value >= 100 && clearInterval(Interval1)
  }, speed)

  onUnmounted(() => {
    clearInterval(Interval1)
  })

  onDeactivated(() => {
    clearInterval(Interval1)
  })
  return { count }
}
