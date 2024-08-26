import { biz } from 'dingtalk-jsapi'
import { v1 } from 'uuid'
import { showToast as toast, type ToastOptions } from 'vant'
import { compressImage } from '~/tools/compressImage'
import { wechatScan, wechatShare } from '~/tools/wx'
import { isHttps } from '~/utils/check'
import { blobToFile } from '~/utils/convert'
import { isDingDing, isWeChat } from '~/utils/uaParser'

/**
 * 获取用户图片
 * @param option 压缩选项
 * @returns 返回一个 Promise，该 Promise 在用户选择图片后解析为 File 对象
 */
export function getUserImage(option?: Compressor.Options) {
  return new Promise<File>((resolve, reject) => {
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.type = 'file'
    input.accept = 'image/*'
    input.multiple = false

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      if (file) {
        compressImage(file, option)
          .then((f) => {
            resolve(blobToFile(f, `${v1()}.jpg`))
          })
          .catch((err) => {
            reject(err)
          })
          .finally(() => {
            document.body.removeChild(input)
          })
      } else {
        document.body.removeChild(input)
        reject(new Error('No file selected'))
      }
    }
    input.click()
  })
}

export function getUserVideo() {
  return new Promise<File>((resolve, reject) => {
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.type = 'file'
    input.accept = 'video/*'
    input.multiple = false

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      if (file) {
        resolve(file)
      } else {
        reject(new Error('No file selected'))
      }
      document.body.removeChild(input)
    }
    input.click()
  })
}

export function getPosition() {
  return new Promise<GeolocationCoordinates>((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords)
        },
        (...args) => {
          reject(args)
        },
      )
    } else {
      reject('你的浏览器不支持当前地理位置信息获取')
    }
  })
}

export function registerWechatShare() {
  const title = import.meta.env.VITE_APP_SHARE_TITLE
  const desc = import.meta.env.VITE_APP_SHARE_DESC
  const link = import.meta.env.VITE_APP_SHARE_LINK
  const imgUrl = import.meta.env.VITE_APP_SHARE_IMGURL

  if (isHttps() && isWeChat) {
    wechatShare({ title, desc, link, imgUrl })
  }
}

let isScanning = false
export function openScanQrCode() {
  return new Promise<string>((resolve, reject) => {
    if (isScanning) return reject('扫码功能正在运行中')
    isScanning = true

    if (isWeChat) {
      wechatScan()
        .then((resultStr) => {
          if (resultStr) resolve(resultStr)
        })
        .catch(() => {})
        .finally(() => {
          isScanning = false
        })
    } else if (isDingDing()) {
      biz.util
        .scan({ type: 'qrCode' })
        .then((res) => {
          if (res.text) resolve(res.text)
        })
        .catch(() => {})
        .finally(() => {
          isScanning = false
        })
    } else {
      isScanning = false
      showDialog({ message: '请在微信或钉钉中使用扫码功能' })
    }
  })
}

export function showToast(option: (ToastOptions & { status?: 'success' | 'info' | 'fail' }) | string) {
  if (typeof option === 'string') return toast(option)

  const _message = option?.status
    ? `<img style="height: 20px;margin-right:6px;" src="https://oss.eventnet.cn/H5/zz/public/svg/${option.status}.svg" /><p>${option?.message || ''}</p>`
    : option?.message || ''

  return toast({ ...option, message: _message, type: 'html' })
}

export function setMark(name: string) {
  const dom = document.querySelector(name) as HTMLElement | null
  if (!dom) return

  dom.style.outline = '1px solid #C7253E'
  dom.addEventListener('focusin', () => dom.style.removeProperty('outline'), { once: true })
}
