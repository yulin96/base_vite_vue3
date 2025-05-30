import { wechatShare } from '@/shared'
import { isHttps, isWeChat } from '@/utils'

export function registerWechatShare() {
  const title = import.meta.env.VITE_APP_SHARE_TITLE
  const desc = import.meta.env.VITE_APP_SHARE_DESC
  const link = import.meta.env.VITE_APP_SHARE_LINK
  const imgUrl = import.meta.env.VITE_APP_SHARE_IMGURL

  if (isHttps() && isWeChat()) {
    wechatShare({ title, desc, link, imgUrl })
    return true
  } else {
    return false
  }
}
