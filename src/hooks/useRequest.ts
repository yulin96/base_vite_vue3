import type { AxiosRequestConfig } from 'axios'
import nprogress from 'nprogress'
import { readonly } from 'vue'
import { toast } from 'vue-sonner'
import { userLock } from '~/hooks/useLock'
import { axiosGet, axiosPost } from '~/tools/request'

nprogress.configure({
  showSpinner: false,
  minimum: 0.3,
  trickleSpeed: 120,
})

export function useRequest(disableLock = false, showProgress = false, delay = 500) {
  const [status, lock, unLock] = userLock()

  const post = (
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig<any>,
    dataType?: IFormDataOrJSON,
  ): Promise<never> => {
    if (status.value && !disableLock)
      return Promise.reject({ code: -9996, error: '请求正在进行中，请稍后再试' })

    showProgress && nprogress?.start()
    lock()

    if (config?.signal) unLock()

    return new Promise((resolve, reject) => {
      let toastId: string | number | null = null
      const requestTimer = setTimeout(() => {
        toastId = toast.loading('加载中...')
      }, 10000)

      axiosPost(url, data, config, dataType)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
          if (err.name == 'CanceledError') return
          toast.error('正在加载中....', { duration: 3600 })
        })
        .finally(() => {
          clearTimeout(requestTimer)
          toastId && toast.dismiss(toastId)

          showProgress && nprogress?.done()
          delay
            ? setTimeout(() => {
                unLock()
              }, delay)
            : unLock()
        })
    })
  }

  const get = (
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig<any>,
    data?: Record<string, any>,
  ): Promise<never> => {
    if (status.value && !disableLock)
      return Promise.reject({ code: -9996, error: '请求正在进行中，请稍后再试' })

    showProgress && nprogress?.start()
    lock()

    if (config?.signal) unLock()

    return new Promise((resolve, reject) => {
      let toastId: string | number | null = null
      const requestTimer = setTimeout(() => {
        toastId = toast.loading('加载中...')
      }, 10000)

      axiosGet(url, params, config, data)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
          if (err.name == 'CanceledError') return
          toast.error('正在加载中....', { duration: 3600 })
        })
        .finally(() => {
          clearTimeout(requestTimer)
          toastId && toast.dismiss(toastId)

          showProgress && nprogress?.done()
          delay
            ? setTimeout(() => {
                unLock()
              }, delay)
            : unLock()
        })
    })
  }

  return { post, get, lock: readonly(status) }
}
