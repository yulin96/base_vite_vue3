import { isWeChat } from '~/utils/uaParser'
import { WxPreviewImage } from '~/tools/wx'
import { showImagePreview } from 'vant'

export const usePreviewImage = () => {
  const previewImage = (urls: string[], index: number = 0) => {
    if (isWeChat) WxPreviewImage(urls[index], urls)
    else showImagePreview({ images: urls, startPosition: index })
  }
  return { previewImage }
}
