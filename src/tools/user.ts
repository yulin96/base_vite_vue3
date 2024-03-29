import { v1 } from 'uuid'

/**
 * 获取用户图片
 * @param option 压缩选项
 * @returns 返回一个 Promise，该 Promise 在用户选择图片后解析为 File 对象
 */
export const getUserImage = (option?: Compressor.Options) => {
  return new Promise<File>((resolve, reject) => {
    const input = document.createElement('input')
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
      } else {
        reject(new Error('No file selected'))
      }
    }
    input.click()
  })
}

export const getUserVideo = (option?: Compressor.Options) => {
  return new Promise<File>((resolve, reject) => {
    const input = document.createElement('input')
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
    }
    input.click()
  })
}
