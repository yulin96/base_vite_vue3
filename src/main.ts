import { MotionPlugin } from '@vueuse/motion'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { registerDirective } from '~/tools/init/directive'
import '~/tools/init/gsap'
import '~/tools/init/resetWxFontSize'
import '~/tools/init/setRem'
import '~/tools/init/vant'
import { getWechatConfig } from '~/tools/wx'
import { devModel } from '~/utils/global'
import App from './App.vue'
import router from './router'
// 从 '~/lang' 导入 i18n

import 'vant/es/dialog/style'
import 'vant/es/image-preview/style'
import 'vant/es/notify/style'
import 'vant/es/toast/style'
import '~/assets/css/main.css'

import * as Sentry from '@sentry/vue'

!devModel && getWechatConfig()

parent?.document.documentElement.style.setProperty(
  '--main-color',
  import.meta.env.VITE_APP_MAIN_COLOR,
)
window.document.documentElement.style.setProperty(
  '--main-color',
  import.meta.env.VITE_APP_MAIN_COLOR,
)

const app = createApp(App)

registerDirective(app)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

Sentry.init({
  app,
  enabled: !devModel,
  dsn: 'https://5f007f03176727466f42b46c433c17b9@fast-worm-91.deno.dev/4508361921331200',
  integrations: [Sentry.browserTracingIntegration({ router }), Sentry.replayIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ['localhost', '192.168.1.2', /^https:\/\/h5.eventnet\.cn/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})

// App.use(i18n)
app.use(pinia)
app.use(router)
app.use(MotionPlugin)

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

app.mount('#app')
