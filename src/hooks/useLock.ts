import nprogress from 'nprogress'
import type { ToastWrapperInstance } from 'vant'

nprogress.configure({
  showSpinner: false,
  minimum: 0.3,
  trickleSpeed: 120,
})

const openProgress = true

export const useLock = (auto = true, delay = 150) => {
  const lock = ref(false)
  let controller: AbortController

  const post = (_url: string, _data?: any, headers = {}): Promise<IRes> => {
    if (lock.value) return Promise.reject({ code: -9996, error: '请求正在进行中，请稍后再试' })
    controller = new AbortController()
    openProgress && nprogress?.start()
    lock.value = true
    return new Promise((resolve, reject) => {
      let requestToast: ToastWrapperInstance | undefined
      const requestTimer = setTimeout(() => {
        requestToast = showLoadingToast({ message: '加载中...', duration: 0 })
      }, 1000)

      axios_post(_url, objToFormData(_data), headers, controller.signal)
        .then((res: any) => {
          resolve(res)
        })
        .catch((err) => {
          if (err.name !== 'CanceledError') showToast({ message: '网络繁忙，请稍后重试' })
          reject(err)
        })
        .finally(() => {
          clearTimeout(requestTimer)
          requestToast?.close()

          openProgress && nprogress?.done()
          auto &&
            (delay
              ? setTimeout(() => {
                  lock.value = false
                }, delay)
              : (lock.value = false))
        })
    })
  }

  const get = (_url: string, _data?: any, headers = {}): Promise<IRes> => {
    if (lock.value) return Promise.reject({ code: -9996, error: '请求正在进行中，请稍后再试' })
    controller = new AbortController()
    openProgress && nprogress?.start()
    lock.value = true
    return new Promise((resolve, reject) => {
      let requestToast: ToastWrapperInstance | undefined
      const requestTimer = setTimeout(() => {
        requestToast = showLoadingToast({ message: '加载中...', duration: 0 })
      }, 1000)

      axios_get(_url, _data, headers, controller.signal)
        .then((res: any) => {
          resolve(res)
        })
        .catch((err) => {
          if (err.name !== 'CanceledError') showToast({ message: '网络繁忙，请稍后重试' })
          reject(err)
        })
        .finally(() => {
          clearTimeout(requestTimer)
          requestToast?.close()

          openProgress && nprogress?.done()
          auto &&
            (delay
              ? setTimeout(() => {
                  lock.value = false
                }, delay)
              : (lock.value = false))
        })
    })
  }

  const abort = () => {
    controller?.abort()
  }

  return { post, get, lock, abort }
}
