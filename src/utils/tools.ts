export const sleep = (time: number) =>
  new Promise<void>((resolve, _) => {
    setTimeout(() => {
      resolve()
    }, time)
  })

export const getImageUrl = (name: string) => new URL(`../assets/images/${name}`, import.meta.url).href

export const getSrc = (name: string) => {
  if (typeof name === 'undefined') return 'error.png'
  const path = `/src/assets/contract/${name}.png`
  const modules = import.meta.glob('/src/assets/contract/*', { eager: true })
  return (modules[path] as any)?.default
}

export const Trim = (str: string): string => {
  // return str.replace(/(^\s*)|(\s*$)/g, '')
  return str.replace(/\s/g, '')
}

export const randomName = (device = 'z', len = 16): string => {
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
  return device + '_' + timestamp + '_' + createStr
}

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

export const randomNum = (m: number, n: number): number => {
  return parseInt(String(Math.random() * (n - m + 1) + m))
}

export const dayDif = (date1: any, date2: any) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000) - 1

export const dayOfYear = (date: any) =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24)

export const randomHex = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, '0')}`

export const randomString = (): string => `${Math.random().toString(36).slice(6)}-`

export const formDataToObj = (formData: FormData) => {
  const object = {}
  for (const [key, value] of formData) {
    object[key] = value
  }
  return object
}

export const isFromData = <T>(formData: T) => {
  return Object.prototype.toString.call(formData) === '[object FormData]'
}

export const darOfYear = (now = new Date()): number => {
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  const day = Math.floor(diff / oneDay)
  return day
}

export const randomLenString = (len: number) => {
  len = len || 32
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

export const randomStr = (len = 12) => {
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz'
  const maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

export const ScrollToTop = (e: Element) => {
  e.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}

export const fixHeight_en_bmw = (e: string) =>
  e.replace(/[^\u4e00-\u9fa5]/g, (m) => '<i style="font-style: normal;position: relative;top: 1px;">' + m + '</i>')

export const deepCopy = (obj: any): any => {
  if (obj === null || typeof obj !== 'object') return obj

  if (Array.isArray(obj)) return obj.map(deepCopy)

  const copy = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key])
    }
  }
  return copy
}

export const handlePhone = (phone: string) => phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')

export const getRandomInt = (n: number, m: number) => Math.floor(Math.random() * (m - n + 1) + n)

export const maskPhone = (phone: string) => {
  return phone.replace(/(\d{3})\d+(\d{4})/u, '$1****$2')
}

export const importScript = (url: string) => {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = () => resolve()
    script.onerror = () => reject()
    document.body.appendChild(script)
  })
}
