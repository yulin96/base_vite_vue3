import { isWeChat } from '~/utils/tools/ua-parser'
import { WxPreviewImage } from '~/utils/wx'
import { showImagePreview } from 'vant'

export const usePreviewImage = () => {
  const previewImage = (urls: string[], index: number = 0) => {
    if (isWeChat) WxPreviewImage(urls[index], urls)
    else showImagePreview({ images: urls, startPosition: index })
  }
  return { previewImage }
}
