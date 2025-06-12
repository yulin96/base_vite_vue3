import comingSoon from '@/components/com/coming-soon/index.vue'
import { createApp, type ComponentPublicInstance } from 'vue'

let appRoot: HTMLElement | null = null
let app: ReturnType<typeof createApp> | null = null

let instance: ComponentPublicInstance<typeof comingSoon> | null = null
export function showComingSoon(text?: string) {
  if (app) {
    instance?.show()
    return
  }
  const container = document.createElement('div')
  appRoot = document.querySelector('#app')
  if (!appRoot) return console.error('App root not found')
  appRoot.appendChild(container)
  app = createApp(comingSoon, { text })

  instance = app.mount(container)
}
