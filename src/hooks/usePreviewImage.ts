import { isWeChat } from '~/utils/uaParser'
import { wxPreviewImage } from '~/tools/wx'
import { showImagePreview } from 'vant'

export const usePreviewImage = () => {
  const previewImage = (urls: string[], index: number = 0) => {
    if (isWeChat) wxPreviewImage(urls[index], urls)
    else showImagePreview({ images: urls, startPosition: index })
  }
  return { previewImage }
}
