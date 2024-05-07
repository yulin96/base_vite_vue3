import { wxPreviewImage } from '~/tools/wx'
import { isWeChat } from '~/utils/uaParser'

export const showImage = (url: string[] | string, index: number = 0) => {
  const imageUrls = Array.isArray(url) ? url : [url]

  if (isWeChat && isHttps()) wxPreviewImage(imageUrls[index], imageUrls)
  else showImagePreview({ images: imageUrls, startPosition: index })
}
