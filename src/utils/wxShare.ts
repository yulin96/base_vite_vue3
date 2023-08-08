export const registerWxShare = (shareContent: { title: string; desc: string; link: string; imgUrl: string }) =>
  shareContent.title &&
  shareContent.desc &&
  shareContent.link &&
  shareContent.imgUrl &&
  isWeiXin() &&
  isHttps() &&
  WxShare(shareContent, ~shareContent.link.indexOf('h5.eventnet.cn') ? 2 : 1)
