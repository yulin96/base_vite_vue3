/**
 * 将电话号码转换为拨号链接并跳转到拨号页面。
 * @param phone - 电话号码
 */
export const toTel = (phone: string) => {
  theWindow.location.href = `tel:${phone}`
}

/**
 * 将当前页面的 URL 跳转到指定的 URL。
 * @param url - 要跳转的 URL。
 */
export const toUrl = (url: string) => {
  window.location.href = url
}
