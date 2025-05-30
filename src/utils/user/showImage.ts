import { wechatPreviewImage } from '@/shared'
import { isHttps, isWeChat } from '@/utils'
import { showImagePreview } from 'vant'
import 'vant/es/image-preview/style'

export function showImage(url: string[] | string, index: number = 0) {
  const imageUrls = Array.isArray(url) ? url : [url]

  if (isWeChat() && isHttps()) {
    wechatPreviewImage(imageUrls[index], imageUrls)
  } else {
    showImagePreview({ images: imageUrls, startPosition: index, teleport: '#app' })
  }
}
