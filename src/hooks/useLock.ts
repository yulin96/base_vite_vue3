import nprogress from 'nprogress'
import { showLoadingToast, showToast, type ToastWrapperInstance } from 'vant'
import type { AxiosRequestConfig } from 'axios'
import { axios_get, axios_post } from '~/utils/request'
import { toFormData } from '~/utils/tools'

nprogress.configure({
  showSpinner: false,
  minimum: 0.3,
  trickleSpeed: 120,
})

const openProgress = true

export const usePostLock = (auto = true, delay = 300) => {
  const lock = ref(false)
  let controller: AbortController

  const post = (
    _url: string,
    _data?: Record<string, any>,
    headers?: Record<string, any>,
    otherConfig: AxiosRequestConfig = {},
  ): Promise<never> => {
    if (lock.value) return Promise.reject({ code: -9996, error: '请求正在进行中，请稍后再试' })
    controller = new AbortController()
    openProgress && nprogress?.start()
    lock.value = true
    return new Promise((resolve, reject) => {
      let requestToast: ToastWrapperInstance | undefined
      const requestTimer = setTimeout(() => {
        requestToast = showLoadingToast({ message: '加载中...', duration: 0 })
      }, 2000)

      axios_post(_url, _data ? toFormData(_data) : null, headers ? headers : null, controller.signal, otherConfig)
        .then((res) => {
          resolve(res as never)
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

  return [post, lock, abort] as [typeof post, typeof lock, typeof abort]
}

export const useGetLock = (auto = true, delay = 300) => {
  const lock = ref(false)
  let controller: AbortController

  const get = (
    _url: string,
    _data?: Record<string, any>,
    headers?: Record<string, any>,
    otherConfig: AxiosRequestConfig = {},
  ): Promise<never> => {
    if (lock.value) return Promise.reject({ code: -9996, error: '请求正在进行中，请稍后再试' })
    controller = new AbortController()
    openProgress && nprogress?.start()
    lock.value = true
    return new Promise((resolve, reject) => {
      let requestToast: ToastWrapperInstance | undefined
      const requestTimer = setTimeout(() => {
        requestToast = showLoadingToast({ message: '加载中...', duration: 0 })
      }, 2000)

      axios_get(_url, _data ? _data : null, headers ? headers : null, controller.signal, otherConfig)
        .then((res) => {
          resolve(res as never)
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

  return [get, lock, abort] as [typeof get, typeof lock, typeof abort]
}
