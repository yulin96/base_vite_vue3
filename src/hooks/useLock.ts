import type { AxiosRequestConfig } from 'axios'
import nprogress from 'nprogress'
import { showLoadingToast, type ToastWrapperInstance } from 'vant'
import { axiosGet, axiosPost } from '~/tools/request'

nprogress.configure({
  showSpinner: false,
  minimum: 0.3,
  trickleSpeed: 120,
})

export const useLock = (showProgress = true, delay = 500) => {
  const lock = ref(false)

  const post = (
    url: string,
    data?: Record<string, any>,
    dataType?: 'FormData' | 'JSON',
    headers?: Record<string, any>,
    config?: AxiosRequestConfig,
  ): Promise<IRes> => {
    if (lock.value) return Promise.reject({ code: -9996, error: '请求正在进行中，请稍后再试' })

    showProgress && nprogress?.start()
    lock.value = true
    return new Promise((resolve, reject) => {
      let requestToast: ToastWrapperInstance | undefined
      const requestTimer = setTimeout(() => {
        requestToast = showLoadingToast({ message: '加载中...', duration: 0 })
      }, 5000)

      axiosPost(url, data, dataType, headers, config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          if (err.name !== 'CanceledError') showNotify({ type: 'danger', message: '网络繁忙，请稍后重试' })
          reject(err)
        })
        .finally(() => {
          clearTimeout(requestTimer)
          requestToast?.close()

          showProgress && nprogress?.done()
          delay
            ? setTimeout(() => {
                lock.value = false
              }, delay)
            : (lock.value = false)
        })
    })
  }

  const get = (
    url: string,
    data?: Record<string, any>,
    headers?: Record<string, any>,
    config?: AxiosRequestConfig,
  ): Promise<IRes> => {
    if (lock.value) return Promise.reject({ code: -9996, error: '请求正在进行中，请稍后再试' })

    showProgress && nprogress?.start()
    lock.value = true
    return new Promise((resolve, reject) => {
      let requestToast: ToastWrapperInstance | undefined
      const requestTimer = setTimeout(() => {
        requestToast = showLoadingToast({ message: '加载中...', duration: 0 })
      }, 5000)

      axiosGet(url, data, headers, config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
        .finally(() => {
          clearTimeout(requestTimer)
          requestToast?.close()

          showProgress && nprogress?.done()
          delay
            ? setTimeout(() => {
                lock.value = false
              }, delay)
            : (lock.value = false)
        })
    })
  }

  return { post, get, lock: readonly(lock) }
}
