import axios, { type AxiosInstance } from 'axios'
import { isFromData, formDataToObj } from '~/utils/tools'

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
  timeout: 5000,
})

const instanceHttp = axios.create({
  timeout: 5000,
})

interceptor(instance)
interceptor(instanceHttp)

/**
 * 发送 GET 请求
 * @param {string} url - 请求地址
 * @param {object} params - 请求参数
 * @param {object} headers - headers配置项
 * @returns {Promise<any>} - 返回 Promise 对象
 */
export const axios_get = (
  url: string,
  params: object = {},
  headers: object = {},
  signal: AbortSignal,
): Promise<any> => {
  return new Promise((resolve, reject) =>
    (url.startsWith('http') ? instanceHttp : instance)
      .get(url, { params, headers, signal })
      .then((response: any) => resolve(response.data))
      .catch((error: any) => reject(error)),
  )
}

/**
 * 发送 POST 请求
 * @param {string} url - 请求地址
 * @param {object} data - 请求参数
 * @param {object} headers - headers 配置项
 * @returns {Promise<any>} - 返回 Promise 对象
 */
export const axios_post = (url: string, data: object, headers: object = {}, signal: AbortSignal): Promise<any> => {
  return new Promise((resolve, reject) =>
    (url.startsWith('http') ? instanceHttp : instance)
      .post(url, data, { headers, signal })
      .then((response: any) => resolve(response.data))
      .catch((error: any) => reject(error)),
  )
}

/**
 * 获取本地 JSON 文件
 * @param {string} url - JSON 文件路径
 * @returns {Promise<any>} - 返回 Promise 对象
 */
export const getLocalJson = (url: string): Promise<any> =>
  new Promise<any>((resolve, reject) => {
    fetch('./' + url)
      .then((response) => response.json())
      .then((res) => {
        resolve(res)
      })
  })
