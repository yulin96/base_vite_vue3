export const registerWxShare = () => {
  const {
    VITE_APP_SHARE_TITLE: title,
    VITE_APP_SHARE_DESC: desc,
    VITE_APP_SHARE_LINK: link,
    VITE_APP_SHARE_IMGURL: imgUrl,
  } = import.meta.env

  const shareContent = { title, desc, link, imgUrl }

  shareContent.title &&
    shareContent.desc &&
    shareContent.link &&
    shareContent.imgUrl &&
    isWeiXin() &&
    isHttps() &&
    WxShare(shareContent, ~shareContent.link.indexOf('h5.eventnet.cn') ? 2 : 1)
}
