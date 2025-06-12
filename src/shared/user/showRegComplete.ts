import regComplete from '@/components/com/reg-complete/index.vue'
import { createApp, type ComponentPublicInstance } from 'vue'

let appRoot: HTMLElement | null = null
let app: ReturnType<typeof createApp> | null = null

let instance: ComponentPublicInstance<typeof regComplete> | null = null

export function showRegComplete(text?: string) {
  if (app) {
    instance?.show()
    return
  }
  const container = document.createElement('div')
  appRoot = document.querySelector('#app')
  if (!appRoot) return console.error('App root not found')
  appRoot.appendChild(container)
  app = createApp(regComplete, { text })

  instance = app.mount(container)
}
