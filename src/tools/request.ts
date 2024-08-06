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
  timeout: 10000,
})

const instanceHttp = axios.create({
  timeout: 10000,
})

interceptor(instance)
interceptor(instanceHttp)

export const axiosGet = (
  url: string,
  params?: Record<string, any>,
  headers?: Record<string, any>,
  config: AxiosRequestConfig = {},
) => {
  return new Promise<IRes>((resolve, reject) => {
    ;(url.startsWith('http') ? instanceHttp : instance)
      .get(url, {
        adapter: ['fetch', 'xhr'],
        ...(params ? { params } : {}),
        ...(headers ? { headers } : {}),
        ...config,
      })
      .then((response) => resolve(response.data))
      .catch(() => reject())
  })
}

export const axiosPost = (
  url: string,
  data: Record<string, any> = {},
  dataType: 'FormData' | 'JSON' = 'FormData',
  headers: Record<string, any> | undefined,
  config: AxiosRequestConfig = {},
) => {
  const isFromData = dataType === 'FormData'
  const _headers = {
    ...headers,
    'Content-Type': isFromData ? 'multipart/form-data' : 'application/json',
  }

  return new Promise<IRes>((resolve, reject) =>
    (url.startsWith('http') ? instanceHttp : instance)
      .post(url, isFromData ? toFormData(data) : data, { adapter: ['fetch', 'xhr'], ...config, headers: _headers })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error)),
  )
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
