import { showImagePreview } from 'vant'
import { wxPreviewImage } from '~/tools/wx'
import { isWeChat } from '~/utils/uaParser'

export const previewImage = (urls: string[], index: number = 0) => {
  if (isWeChat) wxPreviewImage(urls[index], urls)
  else showImagePreview({ images: urls, startPosition: index })
}
