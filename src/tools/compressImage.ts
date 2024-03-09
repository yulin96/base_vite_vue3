import Compressor from 'compressorjs'

export const compressImage = (file: File, options: Compressor.Options) => {
  return new Promise<File | Blob>((resolve, reject) => {
    new Compressor(file, {
      quality: 0.6,
      convertTypes: ['image/png', 'image/webp'],
      mimeType: 'image/jpeg',
      ...options,
      success(result) {
        resolve(result)
      },
      error(err) {
        reject(err)
      },
    })
  })
}
