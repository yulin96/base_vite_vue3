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
  const s = []
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

export const blobToFile = (theBlob: any, fileName: any): File => {
  theBlob.lastModifiedDate = new Date()
  theBlob.name = fileName
  return theBlob
}

export const Base64ToBlob = (urlData: any): Blob => {
  const arr = urlData.split(',')
  const _arr = arr[1].substring(0, arr[1].length - 2)
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = window.atob(_arr)
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mime,
  })
}

export function debounce(func: { apply: (arg0: any, arg1: IArguments) => void }, wait = 300, immediate = true) {
  let timeout: number | any
  return function executedFunction(this: any) {
    const self = this
    const args = arguments
    const later = function () {
      timeout = 0
      if (!immediate) func.apply(self, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(self, args)
  }
}

export function throttle(fn: { apply: (arg0: any, arg1: IArguments) => any }, wait = 300, isImmediate = true) {
  let flag = true
  return function (this: any) {
    if (flag == true) {
      const _this = this
      const args = arguments
      flag = false
      isImmediate && fn.apply(_this, args)
      setTimeout(() => {
        !isImmediate && fn.apply(_this, args)
        flag = true
      }, wait)
    }
  }
}

export const dayDif = (date1: any, date2: any) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000) - 1

export const dayOfYear = (date: any) =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24)

export const randomHex = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, '0')}`

export const randomString = (): string => `${Math.random().toString(36).slice(6)}-`

//blobToBase64
export const blobToBase64 = (blob: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      resolve(e?.target?.result)
    }
    fileReader.readAsDataURL(blob)
    fileReader.onerror = () => {
      reject(new Error('blobToBase64 error'))
    }
  })
}

export const objToFormData = (object: Object) => {
  const Data = new FormData()
  for (const key in object) {
    Data.append(key, object[key])
  }
  return Data
}

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
