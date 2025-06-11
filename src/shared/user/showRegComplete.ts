import regComplete from '@/components/com/reg-complete/index.vue'
import { createApp } from 'vue'

let appRoot: HTMLElement | null = null
let app: ReturnType<typeof createApp> | null = null

export function showRegComplete(text?: string) {
  if (app) {
    app._instance?.exposed?.show()
    return
  }
  const container = document.createElement('div')
  appRoot = document.querySelector('#app')
  if (!appRoot) return console.error('App root not found')
  appRoot.appendChild(container)
  app = createApp(regComplete, { text })

  app.mount(container)
}
