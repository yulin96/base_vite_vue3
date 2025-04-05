/**
 * 全局窗口对象的引用
 * 使用一个变量存储，便于在不同上下文中访问
 */
const theWindow = window

/**
 * 当前应用是否为生产模式
 * @type {boolean} - 生产模式标志
 */
export const prodModel = import.meta.env.PROD

/**
 * 当前应用是否为开发模式
 * @type {boolean} - 开发模式标志
 */
export const devModel = import.meta.env.DEV

/**
 * 将电话号码转换为拨号链接并跳转到拨号页面。
 * @param phone - 电话号码
 */
export function toTel(phone?: string): void {
  if (!phone) return
  theWindow.location.href = `tel:${phone}`
}

/**
 * 跳转到指定页面
 * @param url - 目标URL
 * @param options - 跳转选项
 */
export function toUrl(url: string, options: { newTab?: boolean; replace?: boolean } = {}): void {
  const { newTab = false, replace = false } = options

  try {
    if (newTab) {
      window.open(url, '_blank')
    } else if (replace) {
      window.location.replace(url)
    } else {
      window.location.href = url
    }
  } catch (e) {
    console.error('页面导航失败:', e)
  }
}

/**
 * 重新加载页面。
 */
export function reload(): void {
  theWindow.location.reload()
}

/**
 * 复制文本到剪贴板
 * @param text - 要复制的文本
 * @returns 成功返回true，失败返回false
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // 尝试使用现代 Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }

    // 回退到传统方法
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)
    return success
  } catch (e) {
    console.error('复制到剪贴板失败:', e)
    return false
  }
}

/**
 * 检测浏览器是否支持指定的 CSS 特性
 * @param propertyName - CSS 属性名
 * @returns 如果支持则返回 true，否则返回 false
 */
export function supportsCSSProperty(propertyName: string): boolean {
  return propertyName in document.documentElement.style
}

/**
 * 获取浏览器默认语言
 * @returns 浏览器默认语言代码
 */
export function getBrowserLanguage(): string {
  return navigator.language || (navigator as any).userLanguage || 'zh-CN'
}
