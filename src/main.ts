import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { registerDirective } from '~/tools/init/directive'
import '~/tools/init/gsap'
import '~/tools/init/resetWxFontSize'
import '~/tools/init/vant'
import { getWechatConfig } from '~/tools/wx'
import { devModel } from '~/utils/global'
import App from './App.vue'
import router from './router'
// import i18n from '~/lang'

import 'vant/es/dialog/style'
import 'vant/es/image-preview/style'
import 'vant/es/notify/style'
import 'vant/es/toast/style'
import '~/assets/css/main.css'

!devModel && getWechatConfig()

parent?.document.documentElement.style.setProperty('--main-color', import.meta.env.VITE_APP_MAIN_COLOR)
window.document.documentElement.style.setProperty('--main-color', import.meta.env.VITE_APP_MAIN_COLOR)

const app = createApp(App)

registerDirective(app)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// app.use(i18n)
app.use(pinia)
app.use(router)

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

app.mount('#app')
