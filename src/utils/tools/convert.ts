export const urlToBlob = (url: string) => {
  return new Promise<Blob>((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = (img) => {
      const target = img.target as HTMLImageElement
      const canvas = document.createElement('canvas')
      canvas.width = target.width
      canvas.height = target.height
      const context = canvas.getContext('2d')
      context?.drawImage(target, 0, 0)
      canvas.toBlob((blob) => {
        if (blob) resolve(blob)
        else reject()
      }, 'image/png')
    }
    image.onerror = reject
    image.src = url
  })
}

export const changeImageSize = (originBlob: Blob, width = 600, height = 800) => {
  return new Promise<Blob>((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!canvas || !ctx) return reject('不支持canvas')
    const img = new Image()
    img.onload = () => {
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        async (blob) => {
          if (!blob) return reject('没有获取到blob')
          resolve(blob)
        },
        'image/jpeg',
        1,
      )
    }
    img.src = URL.createObjectURL(originBlob)
  })
}

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

export const blobToFile = (blob: Blob, fileName: string) => {
  return new File([blob], fileName, { type: blob.type })
}

export const base64ToBlob = (urlData: string | any): Blob => {
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

export const base64ToFile = (urlData: string | any, fileName: string): File => {
  const blob = base64ToBlob(urlData)
  return new File([blob], fileName, { type: blob.type })
}
