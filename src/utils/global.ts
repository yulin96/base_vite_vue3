const theWindow = window

export const isSmallMobile = theWindow.innerHeight < 700

export const prodModel = import.meta.env.PROD

export const devModel = import.meta.env.DEV

/**
 * 将电话号码转换为拨号链接并跳转到拨号页面。
 * @param phone - 电话号码
 */
export function toTel(phone?: string) {
  if (!phone) return
  theWindow.location.href = `tel:${phone}`
}

/**
 * 将当前页面的 URL 跳转到指定的 URL。
 * @param url - 要跳转的 URL。
 */
export function toUrl(url: string) {
  theWindow.location.href = url
}

/**
 * 重新加载页面。
 */
export function reload() {
  theWindow.location.reload()
}
