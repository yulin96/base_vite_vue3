import axios, { toFormData, type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { isFromData, formDataToObj } from '~/utils/common'

function convertData(data: Record<string, any>) {
  if (data == null) return
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (key == 'code') {
        data[key] = +data[key]
        continue
      }

      if (typeof data[key] === 'object') convertData(data[key])
      else if (typeof data[key] === 'number') data[key] = data[key].toString()
      if (data[key] === 'null') data[key] = null
    }
  }
}

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

    convertData(response.data)

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
      .get(url, { ...(params ? { params } : {}), ...(headers ? { headers } : {}), ...config })
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
  return new Promise<IRes>((resolve, reject) =>
    (url.startsWith('http') ? instanceHttp : instance)
      .post(url, dataType === 'FormData' ? toFormData(data) : data, { ...config, ...(headers ? { headers } : {}) })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error)),
  )
}

export const getLocalJson = (url: string) =>
  new Promise((resolve, reject) => {
    fetch('./' + url)
      .then((response) => response.json())
      .then((res) => {
        resolve(res)
      })
  })
