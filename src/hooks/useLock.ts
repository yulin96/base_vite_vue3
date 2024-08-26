import type { AxiosRequestConfig } from 'axios'
import nprogress from 'nprogress'
import { toast } from 'vue-sonner'
import { axiosGet, axiosPost } from '~/tools/request'

nprogress.configure({
  showSpinner: false,
  minimum: 0.3,
  trickleSpeed: 120,
})

export function useLock(showProgress = true, delay = 500) {
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
      let toastId: string | number | null = null
      const requestTimer = setTimeout(() => {
        toastId = toast.loading('加载中...')
      }, 5000)

      axiosPost(url, data, dataType, headers, config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          toast.warning('正在加载中....')
          reject(err)
        })
        .finally(() => {
          clearTimeout(requestTimer)
          toastId && toast.dismiss(toastId)

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
      let toastId: string | number | null = null
      const requestTimer = setTimeout(() => {
        toastId = toast.loading('加载中...')
      }, 5000)

      axiosGet(url, data, headers, config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          toast.warning('正在加载中....')
          reject(err)
        })
        .finally(() => {
          clearTimeout(requestTimer)
          toastId && toast.dismiss(toastId)

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
