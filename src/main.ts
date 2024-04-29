import '~/tools/config/pcSupport'
import '~/tools/config/vant'
import '~/tools/config/pcSupport'
import '~/tools/config/gsap'
import '~/tools/config/devReload'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
// import i18n from '~/lang'

import 'vant/es/dialog/style'
import 'vant/es/image-preview/style'
import 'vant/es/notify/style'
import 'vant/es/toast/style'
import '~/assets/css/main.css'

!devModel && getWxConfig()

theWindow.document.body.style.backgroundColor = import.meta.env.VITE_APP_MAIN_COLOR
theWindow.document.documentElement.style.setProperty('--main-color', import.meta.env.VITE_APP_MAIN_COLOR)

const app = createApp(App)

app.directive('focus', (el: HTMLElement) => el.focus())

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// app.use(i18n)
app.use(pinia)
app.use(router)

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

app.mount('#app')
