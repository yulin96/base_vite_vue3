import { type App, createApp } from 'vue'
import commonLoading from '~/components/common/loading.vue'
import { sleep } from '~/utils/common'

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

  const clearLoading = async () => {
    if (dom) {
      const loading = dom.querySelector('.lds-spinner') as HTMLDivElement | null
      loading?.classList.add('close')

      await sleep(300)

      app?.unmount()
      app = null
      document.body.removeChild(dom)
      dom = null
    }
  }

  return { createLoading, clearLoading }
}
