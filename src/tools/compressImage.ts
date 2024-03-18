import Compressor from 'compressorjs'

export const compressImage = (file: File, options?: Compressor.Options) => {
  return new Promise<File>((resolve, reject) => {
    new Compressor(file, {
      quality: 0.6,
      mimeType: 'image/jpeg',
      ...options,
      success(result) {
        resolve(result as File)
      },
      error(err) {
        reject(err)
      },
    })
  })
}
