import * as Sentry from '@sentry/vue'
import axios, { toFormData, type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { isFromData } from '~/utils/common'
import { formDataToObj } from '~/utils/convert'

const interceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config) => config)

  instance.interceptors.response.use((response) => {
    const requestBody = {
      data: null as null | object,
      url: response.config?.url,
      method: response.config?.method,
      baseUrl: response.config?.baseURL ?? '',
    }

    const method = response.config.method?.toLowerCase()
    const data = method === 'post' ? response.config?.data : response.config?.params
    requestBody.data = isFromData(data) ? formDataToObj(data) : data

    response.data._request = requestBody

    return response
  })
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
})

const instanceHttp = axios.create({})

interceptor(instance)
interceptor(instanceHttp)

export const axiosGet = (
  url: string,
  params?: Record<string, any>,
  config?: AxiosRequestConfig<any>,
  data?: Record<string, any>,
) => {
  return new Promise<IRes>((resolve, reject) => {
    ;(url.startsWith('http') ? instanceHttp : instance)
      .get(url, {
        params,
        ...(data ? { data } : {}),
        adapter: ['fetch', 'xhr'],
        ...(config ?? {}),
      })
      .then((response) => resolve(response.data))
      .catch((error) => {
        Sentry.captureException(error)
        reject(error)
      })
  })
}

export const axiosPost = (
  url: string,
  data?: Record<string, any>,
  config?: AxiosRequestConfig<any>,
  dataType: IFormDataOrJSON = 'FormData',
) => {
  return new Promise<IRes>((resolve, reject) => {
    ;(url.startsWith('http') ? instanceHttp : instance)
      .post(url, data && (dataType === 'FormData' ? toFormData(data) : data), {
        adapter: ['fetch', 'xhr'],
        ...(config ?? {}),
      })
      .then((response) => resolve(response.data))
      .catch((error) => {
        Sentry.captureException(error)
        reject(error)
      })
  })
}

export function getLocalJson(url: string) {
  return new Promise((resolve, reject) => {
    fetch('./' + url)
      .then((response) => response.json())
      .then((res) => {
        resolve(res)
      })
  })
}
