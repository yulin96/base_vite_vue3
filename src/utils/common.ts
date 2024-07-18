/**
 * 延迟指定的时间。
 * @param time 延迟的时间（以毫秒为单位）。
 * @returns 一个 Promise，在指定的时间后解析。
 */
export const sleep = (time: number) => {
  return new Promise<void>((resolve, _) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

/**
 * 去除字符串中的所有空格
 * @param str 要处理的字符串
 * @returns 处理后的字符串
 */
export const trimAll = (str: string): string => {
  return str.replace(/\s/g, '')
}

/**
 * 生成随机名称
 * @param {string} prefix - 设备名称，默认为 'z'
 * @param {number} len - 名称长度，默认为 16
 * @returns {string} - 生成的随机名称
 */
export const randomString = (prefix = 'z', len = 16): string => {
  const seed = 'abcdefghijklmnopqrstuvwxyz1234567890'
  const timestamp = new Date().getTime()
  const createStr = Array.from({ length: len }, () => seed[Math.floor(Math.random() * seed.length)]).join('')
  return `${prefix}_${timestamp}_${createStr}`
}

/**
 * 生成一个随机的 UUID 字符串。
 * @returns 生成的 UUID 字符串。
 */
export const uuid = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 生成指定范围内的随机整数。
 * @param m - 范围的最小值（包含）。
 * @param n - 范围的最大值（包含）。
 * @returns 生成的随机整数。
 */
export const randomNum = (m: number, n: number): number => {
  return parseInt(String(Math.random() * (n - m + 1) + m))
}

/**
 * 计算两个日期之间的天数差异。
 * @param date1 - 第一个日期。
 * @param date2 - 第二个日期。
 * @returns 两个日期之间的天数差异。
 */
export const dayDiff = (date1: Date, date2: Date) => {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    console.error('Invalid date')
  }
  return Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000) - 1
}
/**
 * 计算给定日期是一年中的第几天。
 * @param date - 要计算的日期。
 * @returns 给定日期是一年中的第几天。
 */
export const dayOfYear = (now = new Date()): number => {
  if (!(now instanceof Date)) {
    console.error('Invalid date')
  }
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  const day = Math.floor(diff / oneDay)
  return day
}

/**
 * 生成一个随机的十六进制颜色值。
 * @returns 一个随机的十六进制颜色值，格式为 "#RRGGBB"。
 */
export const randomHex = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, '0')}`

/**
 * 判断给定的数据是否为 FormData 对象。
 * @param formData 要检查的数据。
 * @returns 如果给定的数据是 FormData 对象，则返回 true；否则返回 false。
 * @template T 表示 formData 参数的类型。
 */
export const isFromData = <T>(formData: T) => {
  return Object.prototype.toString.call(formData) === '[object FormData]'
}

/**
 * 滚动到顶部
 * @param {Element} e - 要滚动的元素
 */
export const scrollToTop = (e: Element) => {
  if (!(e instanceof Element)) {
    console.error('Invalid element')
  }
  e.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}

/**
 * 将手机号码进行脱敏处理，只显示前三位和后四位，中间用星号代替。
 * @param phone - 需要脱敏的手机号码
 * @returns 脱敏后的手机号码
 */
export const maskPhone = (phone: string) => {
  if (!/^1[3456789]\d{9}$/.test(phone)) {
    console.error('意外的手机号：', phone)
  }
  return phone.replace(/(\d{3})\d+(\d{4})/u, '$1****$2')
}

/**
 * 异步加载脚本文件。
 * @param url - 要加载的脚本文件的URL。
 * @returns 当脚本加载成功时，返回一个Promise对象，否则返回一个拒绝的Promise对象。
 */
export const importScript = (url: string) => {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = () => {
      resolve()
      script.remove()
    }
    script.onerror = () => reject()
    document.body.appendChild(script)
  })
}

/**
 * 创建一个带有 Promise 的工具函数。
 * @returns 一个包含 Promise、resolve 和 reject 函数的元组。
 */
export const usePromise = (): [Promise<unknown>, (value?: unknown) => void, (reason?: any) => void] => {
  let resolve: (value: unknown) => void = () => {}
  let reject: (reason?: any) => void = () => {}
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return [promise, resolve, reject]
}

/**
 * 从URL中删除指定的参数。
 * @param url - 要处理的URL字符串。
 * @param param - 要删除的参数名称或参数名称数组。
 * @returns 处理后的URL字符串。
 */
export const removeUrlParams = (url: string, param: string | string[]) => {
  const urlObj = new URL(url)
  const params = new URLSearchParams(urlObj.search)

  const paramList = Array.isArray(param) ? param : [param]
  for (const item of paramList) params.delete(item)
  urlObj.search = params.toString()

  return urlObj.toString()
}

export const userLanguage = () =>
  navigator?.language || (Array.isArray(navigator?.languages) && navigator?.languages?.[0]) || 'zh-CN'

export const userLanguageIsChinese = () => userLanguage().includes('zh')

export const userLanguageIsChineseSimple = () => userLanguage().includes('zh-CN')

export const userLanguageIsChineseTradition = () => userLanguage().includes('zh') && !userLanguage().includes('CN')

export const userLanguageIsEnglish = () => userLanguage().includes('en')
