import { v1 } from 'uuid'

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
