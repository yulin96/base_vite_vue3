import { registerDirective } from '@/tools/init/directive'
import '@vant/touch-emulator'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

import '@/tools/init/dev'
import '@/tools/init/hm'
import '@/tools/init/resetWxFontSize'
import '@/tools/init/setRem'

import App from './App.vue'
import router from './router'
// 从 '@/lang' 导入 i18n

import '@/assets/css/main.css'

window.document.documentElement.style.setProperty('--main-color', import.meta.env.VITE_APP_MAIN_COLOR)

const app = createApp(App)

registerDirective(app)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// App.use(i18n)
app.use(pinia)
app.use(router)

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

app.mount('#app')
