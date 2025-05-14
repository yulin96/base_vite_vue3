/**
 * DOM 操作工具函数集合
 * 提供对 DOM 元素的各种操作和判断功能
 */

/**
 * 设置焦点到指定元素
 * @param name - 元素的属性名
 */
export function setFocus(name: string): void {
  const element = document.querySelector(`[${name}]`) as HTMLElement
  if (!element) return

  // 设置 tabindex 临时启用聚焦能力
  element.setAttribute('tabindex', '-1')
  element.focus()

  // 移除临时属性
  setTimeout(() => {
    element.removeAttribute('tabindex')
  }, 200)
}

/**
 * 检测页面上的元素
 * 通过在屏幕上均匀分布的点来检测元素，用于获取页面主要内容
 * @param num - 检测点的数量，默认为 10
 * @returns 检测到的元素集合
 */
export function detectionElements(num = 10): Set<Element> {
  const calcWidth = [10, (innerWidth - 20) / (num - 1)]
  const calcHeight = [10, (innerHeight - 20) / (num - 1)]

  const doms = new Set<Element>()

  for (let i = 0; i < num; i++) {
    const x = calcWidth[0] + calcWidth[1] * i
    const y = calcHeight[0] + calcHeight[1] * i
    const reciprocalY = calcHeight[0] + calcHeight[1] * (num - i - 1)

    // 获取直线上和对角线上的元素
    const element1 = document.elementFromPoint(x, y)
    const element2 = document.elementFromPoint(x, reciprocalY)

    if (element1) doms.add(element1)
    if (element2) doms.add(element2)
  }

  return doms
}

/**
 * 异步加载脚本
 * @param url - 脚本URL
 * @param options - 加载选项
 * @returns Promise 对象，解析为 void
 */
export function loadScript(url: string, options: { async?: boolean; defer?: boolean } = {}): Promise<void> {
  const { async = true, defer = false } = options

  return new Promise((resolve, reject) => {
    // 检查脚本是否已加载
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = url
    script.async = async
    script.defer = defer

    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`))

    document.head.appendChild(script)
  })
}

/**
 * 异步加载样式表
 * @param url - 样式表URL
 * @returns Promise 对象，解析为 void
 */
export function loadStylesheet(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // 检查样式表是否已加载
    if (document.querySelector(`link[href="${url}"]`)) {
      resolve()
      return
    }

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url

    link.onload = () => resolve()
    link.onerror = () => reject(new Error(`Failed to load stylesheet: ${url}`))

    document.head.appendChild(link)
  })
}

/**
 * 获取元素相对于视口的位置
 * @param element - 目标元素
 * @returns 元素相对于视口的位置和尺寸信息
 */
export function getElementViewportPosition(element: Element): DOMRect {
  return element.getBoundingClientRect()
}

/**
 * 检查元素是否在视口中可见
 * @param element - 目标元素
 * @param options - 配置选项
 * @returns 如果元素在视口中可见则返回 true，否则返回 false
 */
export function isElementInViewport(element: Element, options: { threshold?: number } = {}): boolean {
  const { threshold = 0 } = options
  const rect = element.getBoundingClientRect()

  return (
    rect.top + threshold < window.innerHeight &&
    rect.bottom - threshold > 0 &&
    rect.left + threshold < window.innerWidth &&
    rect.right - threshold > 0
  )
}

/**
 * 滚动到指定元素
 * @param element - 目标元素
 * @param options - 滚动选项
 */
export function scrollToElement(
  element: Element,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' },
): void {
  element.scrollIntoView(options)
}

/**
 * 添加事件监听器
 * @param element - 目标元素
 * @param eventType - 事件类型
 * @param handler - 事件处理函数
 * @param options - 事件选项
 * @returns 用于移除事件监听器的函数
 */
export function addEventListenerWithRemove<K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  eventType: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): () => void {
  element.addEventListener(eventType, handler as EventListener, options)
  return () => element.removeEventListener(eventType, handler as EventListener, options)
}

/**
 * 创建一个元素可见性观察器
 * @param element - 要观察的元素
 * @param callback - 元素可见性变化时的回调函数
 * @param options - Intersection Observer 选项
 * @returns 用于停止观察的函数
 */
export function observeElementVisibility(
  element: Element,
  callback: (isVisible: boolean, entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = { threshold: 0 },
): () => void {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      callback(entry.isIntersecting, entry)
    })
  }, options)

  observer.observe(element)
  return () => observer.disconnect()
}

/**
 * 获取元素的计算样式值
 * @param element - 目标元素
 * @param property - CSS 属性名
 * @returns CSS 属性值
 */
export function getComputedStyle(element: Element, property: string): string {
  return window.getComputedStyle(element).getPropertyValue(property)
}

/**
 * 等待元素出现在 DOM 中
 * @param selector - CSS 选择器
 * @param root - 根元素，默认为 document
 * @param timeout - 超时时间（毫秒），默认为 5000
 * @returns Promise 对象，解析为找到的元素
 */
export function waitForElement(
  selector: string,
  root: Document | Element = document,
  timeout = 5000,
): Promise<Element> {
  return new Promise((resolve, reject) => {
    // 首先检查元素是否已存在
    const element = root.querySelector(selector)
    if (element) {
      resolve(element)
      return
    }

    // 如果不存在，设置 MutationObserver 等待它出现
    const observer = new MutationObserver((mutations) => {
      const element = root.querySelector(selector)
      if (element) {
        observer.disconnect()
        resolve(element)
      }
    })

    observer.observe(root, {
      childList: true,
      subtree: true,
    })

    // 设置超时
    if (timeout > 0) {
      setTimeout(() => {
        observer.disconnect()
        reject(new Error(`等待元素 ${selector} 超时`))
      }, timeout)
    }
  })
}

/**
 * 获取元素的所有父元素
 * @param element - 目标元素
 * @returns 包含所有父元素的数组
 */
export function getParents(element: Element): Element[] {
  const parents: Element[] = []
  let current: Element | null = element.parentElement

  while (current) {
    parents.push(current)
    current = current.parentElement
  }

  return parents
}

/**
 * 检查一个元素是否是另一个元素的后代
 * @param child - 可能的后代元素
 * @param parent - 可能的祖先元素
 * @returns 如果 child 是 parent 的后代则返回 true，否则返回 false
 */
export function isDescendantOf(child: Element, parent: Element): boolean {
  let current: Element | null = child

  while (current && current !== parent) {
    current = current.parentElement
  }

  return current === parent
}
