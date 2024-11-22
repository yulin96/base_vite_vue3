import type { AxiosRequestConfig } from 'axios'
import nprogress from 'nprogress'
import { readonly, ref } from 'vue'
import { toast } from 'vue-sonner'
import { axiosGet, axiosPost } from '~/tools/request'

nprogress.configure({
  showSpinner: false,
  minimum: 0.3,
  trickleSpeed: 120,
})

export function useLock(showProgress = false, delay = 500) {
  const lock = ref(false)

  const post = (
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig<any>,
    dataType?: IFormDataOrJSON,
  ): Promise<IRes> => {
    if (lock.value) return Promise.reject({ code: -9996, error: '请求正在进行中，请稍后再试' })

    showProgress && nprogress?.start()
    lock.value = true

    if (config?.signal) lock.value = false

    return new Promise((resolve, reject) => {
      let toastId: string | number | null = null
      const requestTimer = setTimeout(() => {
        toastId = toast.loading('加载中...')
      }, 5000)

      axiosPost(url, data, config, dataType)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          if (err.name == 'CanceledError') return
          toast.error('正在加载中....', { duration: 3600 })
          return
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
    params?: Record<string, any>,
    config?: AxiosRequestConfig<any>,
    data?: Record<string, any>,
  ): Promise<IRes> => {
    if (lock.value) return Promise.reject({ code: -9996, error: '请求正在进行中，请稍后再试' })

    showProgress && nprogress?.start()
    lock.value = true

    if (config?.signal) lock.value = false

    return new Promise((resolve, reject) => {
      let toastId: string | number | null = null
      const requestTimer = setTimeout(() => {
        toastId = toast.loading('加载中...')
      }, 5000)

      axiosGet(url, params, config, data)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          if (err.name == 'CanceledError') return
          toast.error('正在加载中....', { duration: 3600 })
          return
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
