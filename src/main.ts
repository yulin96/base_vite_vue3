import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { setDialogDefaultOptions, setNotifyDefaultOptions, setToastDefaultOptions } from 'vant'
import { pcSupport } from '~/tools/pcSupport'
import { checkWebpFeature } from '~/utils/checkWebpFeature'
import { throttle } from 'lodash-es'
import '~/tools/checkUpdate'
import '@vant/touch-emulator'
// import i18n from '~/lang'

import 'vant/es/dialog/style'
import 'vant/es/image-preview/style'
import 'vant/es/notify/style'
import 'vant/es/toast/style'

import '~/assets/css/main.css'

!devModel && getWxConfig()

theWindow.document.body.style.backgroundColor = import.meta.env.VITE_APP_MAIN_COLOR
theWindow.document.documentElement.style.setProperty('--main-color', import.meta.env.VITE_APP_MAIN_COLOR)

if (devModel) {
  let lastWidth = theWindow.innerWidth
  theWindow.addEventListener(
    'resize',
    throttle(() => {
      if (lastWidth !== theWindow.innerWidth) {
        theWindow.location.reload()
        lastWidth = theWindow.innerWidth
      }
    }, 300),
  )
}

if (import.meta.env.VITE_APP_OPENPC == '1') {
  pcSupport().then(() => {})
}

checkWebpFeature((_, result) => {
  if (result) document.documentElement.classList.add('webp')
}, 'lossless')

setToastDefaultOptions({
  forbidClick: true,
  overlay: true,
  duration: 1200,
  overlayClass: 'center_toast_overlay',
  transition: 'center_fromTop_toast',
  position: 'middle',
  className: 'center_toast',
})
setToastDefaultOptions('loading', { duration: 0 })
setNotifyDefaultOptions({ type: 'warning' })
setDialogDefaultOptions({ title: '温馨提示', theme: 'round-button' })

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
