/**
 * 将URL转换为Blob对象。
 * @param url - 要转换的URL。
 * @returns 一个Promise，当转换完成时，将返回一个Blob对象。
 */
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

/**
 * 改变图像大小
 * @param originBlob 原始图像的 Blob 对象
 * @param width 图像的宽度，默认为 600
 * @param height 图像的高度，默认为 800
 * @returns 返回一个 Promise，该 Promise 在图像大小改变后解析为新的 Blob 对象
 * @throws 如果浏览器不支持 canvas，则会抛出错误
 * @throws 如果无法获取到 Blob 对象，则会抛出错误
 */
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

/**
 * 将 Blob 对象转换为 Base64 字符串
 * @param blob 要转换的 Blob 对象
 * @returns 返回一个 Promise，解析为转换后的 Base64 字符串
 */
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

/**
 * 将 Blob 对象转换为 File 对象。
 * @param blob - 要转换的 Blob 对象。
 * @param fileName - 转换后的 File 对象的文件名。
 * @returns 转换后的 File 对象。
 */
export const blobToFile = (blob: Blob, fileName: string) => {
  return new File([blob], fileName, { type: blob.type })
}

/**
 * 将 base64 字符串转换为 Blob 对象
 * @param urlData - base64 字符串
 * @returns Blob 对象
 */
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

/**
 * 将 base64 数据转换为 File 对象。
 * @param urlData - base64 数据或任意类型数据。
 * @param fileName - 文件名。
 * @returns 转换后的 File 对象。
 */
export const base64ToFile = (urlData: string | any, fileName: string): File => {
  const blob = base64ToBlob(urlData)
  return new File([blob], fileName, { type: blob.type })
}

/**
 * 将对象的属性名转换为指定的名称。
 * @param obj - 要转换的对象。
 * @param nameKey - 包含属性名映射关系的对象。
 * @returns 转换后的新对象。
 */
export const convertObjectName = (obj: Record<string, any>, nameKey: Record<string, string>) => {
  const newObj: Record<string, any> = {}
  const keys = Object.keys(nameKey)
  for (const [key, value] of Object.entries(obj)) {
    if (!value) continue
    if (typeof value === 'object') newObj[key] = convertObjectName(value, nameKey)
    else newObj[keys.includes(key) ? nameKey[key] : key] = value
  }

  return newObj
}
