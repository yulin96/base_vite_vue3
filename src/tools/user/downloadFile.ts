import nProgress from 'nprogress'

let lock = false
export function downloadFile(url: string, filename?: string) {
  nProgress.configure({
    showSpinner: false,
    minimum: 0.3,
    trickleSpeed: 120,
  })

  return new Promise<void>((resolve, reject) => {
    if (lock) return
    lock = true
    nProgress.start()
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = new Blob([xhr.response], { type: 'application/octet-stream' })
        const a = document.createElement('a')
        a.href = window.URL.createObjectURL(blob)
        a.download = filename
          ? filename.includes('.')
            ? filename
            : filename + '.' + url.split('.').pop()
          : 'download.' + url.split('.').pop()
        a.click()
        lock = false
        nProgress.done()
        resolve()
      } else {
        lock = false
        nProgress.done()
        reject('下载失败')
      }
    }
    xhr.onerror = () => {
      lock = false
      nProgress.done()
      reject('下载失败')
    }
    xhr.send()
  })
}
