/**
 * 延迟指定的时间
 * @param time 延迟的时间（以毫秒为单位）
 * @returns 一个 Promise，在指定的时间后解析
 */
export function sleep(time: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, time)
  })
}

/**
 * 去除字符串中的所有空格
 * @param str 要处理的字符串
 * @returns 处理后的字符串
 */
export function trimAll(str: string): string {
  return str.replace(/\s+/g, '')
}

/**
 * 生成随机名称
 * @param prefix 前缀，默认为 'z'
 * @param len 随机部分的长度，默认为 16
 * @returns 生成的随机名称
 */
export function randomString(prefix = 'z', len = 16): string {
  const seed = 'abcdefghijklmnopqrstuvwxyz1234567890'
  const timestamp = new Date().getTime()
  const randomChars = Array.from({ length: len }, () => seed[Math.floor(Math.random() * seed.length)]).join('')

  return `${prefix}_${timestamp}_${randomChars}`
}

/**
 * 生成一个随机的 UUID v4 字符串
 * @returns 生成的 UUID 字符串
 */
export function uuid(): string {
  // 如果可用，使用Web Crypto API
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID()
  }

  // 回退到手动实现
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 计算两个日期之间的天数差异
 * @param date1 第一个日期
 * @param date2 第二个日期
 * @returns 两个日期之间的天数差异
 */
export function dayDiff(date1: Date, date2: Date): number {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    throw new Error('参数必须是 Date 类型')
  }

  // 将两个日期都设置为当天的00:00:00以计算天数差
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())

  // 一天的毫秒数
  const ONE_DAY = 1000 * 60 * 60 * 24

  // 计算相差的天数（使用Math.round避免夏令时导致的误差）
  return Math.round(Math.abs((d1.getTime() - d2.getTime()) / ONE_DAY))
}

/**
 * 计算给定日期是一年中的第几天
 * @param date 要计算的日期，默认为今天
 * @returns 给定日期是一年中的第几天
 */
export function dayOfYear(date = new Date()): number {
  if (!(date instanceof Date)) {
    throw new Error('参数必须是 Date 类型')
  }

  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

/**
 * 生成一个随机的十六进制颜色值
 * @returns 一个随机的十六进制颜色值，格式为 "#RRGGBB"
 */
export function randomHex(): string {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0')}`
}

/**
 * 判断给定的数据是否为 FormData 对象
 * @param formData 要检查的数据
 * @returns 如果给定的数据是 FormData 对象，则返回 true；否则返回 false
 */
export function isFormData(formData: unknown): formData is FormData {
  return Object.prototype.toString.call(formData) === '[object FormData]'
}

/**
 * 平滑滚动到元素顶部
 * @param element 要滚动的元素
 * @param options 滚动选项
 */
export function scrollToTop(element: Element, options: ScrollToOptions = { behavior: 'smooth' }): void {
  if (!(element instanceof Element)) {
    throw new Error('参数必须是 Element 类型')
  }

  element.scrollTo({ top: 0, left: 0, ...options })
}

/**
 * 将手机号码进行脱敏处理，只显示前三位和后四位，中间用星号代替
 * @param phone 需要脱敏的手机号码
 * @returns 脱敏后的手机号码
 */
export function maskPhone(phone: string): string {
  if (!/^1[3-9]\d{9}$/.test(phone)) {
    console.warn('非标准手机号格式:', phone)
  }

  return phone.replace(/(\d{3})(\d+)(\d{4})/, '$1****$3')
}

/**
 * 从URL中删除指定的参数
 * @param url 要处理的URL字符串
 * @param params 要删除的参数名称或参数名称数组
 * @returns 处理后的URL字符串
 */
export function removeUrlParams(url: string, params: string | string[]): string {
  try {
    const urlObj = new URL(url)
    const searchParams = new URLSearchParams(urlObj.search)

    const paramList = Array.isArray(params) ? params : [params]

    for (const param of paramList) {
      searchParams.delete(param)
    }

    urlObj.search = searchParams.toString()
    return urlObj.toString()
  } catch (error) {
    return url
  }
}

/**
 * 获取用户的浏览器语言设置
 * @returns 用户的浏览器语言设置
 */
export function userLanguage(): string {
  return navigator?.language || (Array.isArray(navigator?.languages) && navigator?.languages?.[0]) || 'zh-CN'
}

/**
 * 检查用户语言是否为中文
 * @returns 如果用户语言为中文则返回true，否则返回false
 */
export function isChineseLanguage(): boolean {
  return userLanguage().startsWith('zh')
}

/**
 * 检查用户语言是否为简体中文
 * @returns 如果用户语言为简体中文则返回true，否则返回false
 */
export function isSimplifiedChinese(): boolean {
  return userLanguage() === 'zh-CN' || userLanguage() === 'zh-Hans'
}

/**
 * 检查用户语言是否为繁体中文
 * @returns 如果用户语言为繁体中文则返回true，否则返回false
 */
export function isTraditionalChinese(): boolean {
  return isChineseLanguage() && !isSimplifiedChinese()
}

/**
 * 检查用户语言是否为英语
 * @returns 如果用户语言为英语则返回true，否则返回false
 */
export function isEnglishLanguage(): boolean {
  return userLanguage().startsWith('en')
}

/**
 * 将查询参数对象转换为URL查询字符串
 * @param params 查询参数对象
 * @returns URL查询字符串
 */
export function objectToQueryString(params: Record<string, any>): string {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}

/**
 * 解析URL查询字符串为对象
 * @param queryString 查询字符串，可以包含前导?
 * @returns 解析后的对象
 */
export function queryStringToObject(queryString: string): Record<string, string> {
  if (!queryString) return {}

  const normalizedQuery = queryString.startsWith('?') ? queryString.substring(1) : queryString

  const result: Record<string, string> = {}

  for (const pair of normalizedQuery.split('&')) {
    const [key, value] = pair.split('=')
    if (key) {
      result[decodeURIComponent(key)] = decodeURIComponent(value || '')
    }
  }

  return result
}

/**
 * 生成指定范围内的随机数
 * @param min 最小值（包含）
 * @param max 最大值（包含）
 * @returns 生成的随机数
 */
export function randomNum(min: number, max?: number): number {
  if (max === undefined) {
    max = min
    min = 0
  }
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('参数必须是数字类型')
  }

  if (min > max) {
    ;[min, max] = [max, min]
  }

  const randomValue = Math.floor(Math.random() * (max - min + 1)) + min
  return randomValue
}
