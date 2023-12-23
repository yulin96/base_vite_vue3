import { isWeChat } from '~/utils/tools/ua-parser'
import { isHttps } from './check'
import { WxShare } from './wx'

export const registerWxShare = () => {
  const {
    VITE_APP_SHARE_TITLE: title,
    VITE_APP_SHARE_DESC: desc,
    VITE_APP_SHARE_LINK: link,
    VITE_APP_SHARE_IMGURL: imgUrl,
  } = import.meta.env

  const shareContent = { title, desc, link, imgUrl }

  shareContent.title && shareContent.link && shareContent.imgUrl && isWeChat && isHttps() && WxShare(shareContent)

  isHttps() &&
    typeof dd !== 'undefined' &&
    dd?.ready(function () {
      dd.biz.navigation.setRight({
        show: true, //控制按钮显示， true 显示， false 隐藏， 默认true
        control: true, //是否控制点击事件，true 控制，false 不控制， 默认false
        text: '···', //控制显示文本，空字符串表示显示默认文本
        onSuccess: function () {
          //如果control为true，则onSuccess将在发生按钮点击事件被回调
          dd.biz.util.share({
            type: 0, //分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
            url: shareContent.link,
            content: shareContent.desc,
            title: shareContent.title,
            image: shareContent.imgUrl,
            onSuccess: function () {},
            onFail: function () {},
          })
        },
        onFail: function () {},
      })
    })
}
