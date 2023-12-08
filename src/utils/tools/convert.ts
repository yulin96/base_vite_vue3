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
