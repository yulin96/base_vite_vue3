import { wxShare, type IWxShare } from '~/tools/wx'
import { isHttps } from '~/utils/check'
import { isWeChat } from '~/utils/uaParser'

export const registerWxShare = () => {
  const title = import.meta.env.VITE_APP_SHARE_TITLE
  const desc = import.meta.env.VITE_APP_SHARE_DESC
  const link = import.meta.env.VITE_APP_SHARE_LINK
  const imgUrl = import.meta.env.VITE_APP_SHARE_IMGURL

  if (title && link && imgUrl && isWeChat && isHttps()) {
    wxShare({ title, desc, link, imgUrl })
    registerDDShare({ title, desc, link, imgUrl })
  }
}

export const registerDDShare = ({ title, desc, link, imgUrl }: IWxShare) => {
  if (!isHttps() || typeof dd === 'undefined') throw new Error('钉钉分享需要在钉钉环境下使用')

  dd.ready(function () {
    dd.biz.navigation.setRight({
      show: true, //控制按钮显示， true 显示， false 隐藏， 默认true
      control: true, //是否控制点击事件，true 控制，false 不控制， 默认false
      text: '···', //控制显示文本，空字符串表示显示默认文本
      onSuccess: function () {
        //如果control为true，则onSuccess将在发生按钮点击事件被回调
        dd.biz.util.share({
          type: 0, //分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
          url: link,
          content: desc,
          title: title,
          image: imgUrl,
          onSuccess: function () {},
          onFail: function () {},
        })
      },
      onFail: function () {},
    })
  })
}
