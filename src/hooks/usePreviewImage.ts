import { isWeiXin } from '~/utils/check'
import { WxPreviewImage } from '~/utils/wx'
import { showImagePreview } from 'vant'

export const usePreviewImage = (urls: string[], index: number = 0) => {
  if (isWeiXin()) {
    WxPreviewImage(urls[index], urls)
  } else {
    showImagePreview({ images: urls, startPosition: index })
  }
}
