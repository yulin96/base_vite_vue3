import { type App, createApp } from 'vue'
import commonLoading from '~/components/common/loading.vue'

export function useMaskLoading() {
  let app: App<Element> | null = null
  let dom: HTMLDivElement | null = null

  const createLoading = () => {
    if (!app) {
      dom = document.createElement('div')
      document.body.appendChild(dom)
      app = createApp(commonLoading)
      app.mount(dom)
    }
  }

  const clearLoading = () => {
    if (app) {
      app.unmount()
      app = null
    }
    if (dom) {
      dom.classList.add('fade-in')
      document.body.removeChild(dom)
      dom = null
    }
  }

  return { createLoading, clearLoading }
}
