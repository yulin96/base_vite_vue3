import { createToaster } from '@/tools/user/createToaster'
import { toUrl } from '@/utils/global'

let lock = false
export function downloadFile(url: string, filename?: string) {
  if (lock) return
  lock = true
  const { resolve, reject } = createToaster('下载中...')
  if (typeof fetch === 'function') {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]))
        const a = document.createElement('a')
        a.href = url
        a.download = filename ?? url.split('/')?.pop() ?? 'download'
        a.click()
        URL.revokeObjectURL(url)

        setTimeout(() => {
          resolve('下载完成')
        }, 500)
      })
      .catch(() => {
        reject('下载失败')
      })
      .finally(() => {
        setTimeout(() => {
          lock = false
        }, 500)
      })
  } else {
    toUrl(url)
    setTimeout(() => {
      resolve('下载完成')
      lock = false
    }, 500)
  }
}
