import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { isFromData, formDataToObj } from '~/utils/tools'

function convertData(data: Record<string, any>) {
  if (data == null) return
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (key == 'code') continue

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

export const axios_get = (
  url: string,
  params: Record<string, any> | null,
  headers: Record<string, any> | null,
  signal: AbortSignal,
  otherConfig: AxiosRequestConfig = {},
) => {
  return new Promise((resolve, reject) =>
    (url.startsWith('http') ? instanceHttp : instance)
      .get(url, { ...otherConfig, ...(params ? { params } : {}), ...(headers ? { headers } : {}), signal })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error)),
  )
}

export const axios_post = (
  url: string,
  data: Record<string, any> | null,
  headers: Record<string, any> | null,
  signal: AbortSignal,
  otherConfig: AxiosRequestConfig = {},
) => {
  return new Promise((resolve, reject) =>
    (url.startsWith('http') ? instanceHttp : instance)
      .post(url, data, { ...otherConfig, ...(headers ? { headers } : {}), signal })
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
