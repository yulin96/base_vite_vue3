import { showImagePreview } from 'vant'
import { wechatPreviewImage } from '~/tools/wx'
import { isHttps } from '~/utils/check'
import { isWeChat } from '~/utils/uaParser'

export function showImage(url: string[] | string, index: number = 0) {
  const imageUrls = Array.isArray(url) ? url : [url]

  if (isWeChat && isHttps()) wechatPreviewImage(imageUrls[index], imageUrls)
  else showImagePreview({ images: imageUrls, startPosition: index, teleport: '#app' })
}
