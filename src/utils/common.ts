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

export const getImageUrl = (name: string) => new URL(`../assets/images/${name}`, import.meta.url).href

export const getSrc = (name: string) => {
  if (typeof name === 'undefined') return 'error.png'
  const path = `/src/assets/contract/${name}.png`
  const modules = import.meta.glob('/src/assets/contract/*', { eager: true })
  return (modules[path] as any)?.default
}

/**
 * 去除字符串两端的空格
 * @param str 要处理的字符串
 * @returns 处理后的字符串
 */
export const Trim = (str: string): string => {
  // return str.replace(/(^\s*)|(\s*$)/g, '')
  return str.replace(/\s/g, '')
}

/**
 * 生成随机名称
 * @param {string} prefix - 设备名称，默认为 'z'
 * @param {number} len - 名称长度，默认为 16
 * @returns {string} - 生成的随机名称
 */
export const randomString = (prefix = 'z', len = 16): string => {
  const seed = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
  ] // 数组->种子数据
  // let timestamp = Date.parse(new Date()) // 精确到秒
  const timestamp = new Date().getTime() // 当前毫秒的时间戳
  // console.log('时间戳:', timestamp)
  const seedLength = seed.length // 数组长度
  let createStr = ''
  for (let i = 0; i < len; i++) {
    const j = Math.floor(Math.random() * seedLength)
    createStr += seed[j]
  }
  // return createStr
  return prefix + '_' + timestamp + '_' + createStr
}

/**
 * 生成一个随机的 UUID 字符串。
 * @returns 生成的 UUID 字符串。
 */
export const uuid = (): string => {
  const s: Array<string> = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((+s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  const uuid = s.join('')
  return uuid
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
export const dayDif = (date1: any, date2: any) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000) - 1

/**
 * 计算给定日期是一年中的第几天。
 * @param date - 要计算的日期。
 * @returns 给定日期是一年中的第几天。
 */
export const dayOfYear = (date: any) =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24)

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
 * 计算给定日期是一年中的第几天。
 * @param now - 要计算的日期。如果未提供，则默认为当前日期。
 * @returns 一个表示给定日期是一年中的第几天的数字。
 */
export const darOfYear = (now = new Date()): number => {
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  const day = Math.floor(diff / oneDay)
  return day
}

/**
 * 滚动到顶部
 * @param {Element} e - 要滚动的元素
 */
export const ScrollToTop = (e: Element) => {
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
    script.onload = () => resolve()
    script.onerror = () => reject()
    document.body.appendChild(script)
  })
}
