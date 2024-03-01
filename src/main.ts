import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { setDialogDefaultOptions, setNotifyDefaultOptions, setToastDefaultOptions } from 'vant'
import { addPcSupport } from '~/utils/addPcSupport'
import { checkWebpFeature } from '~/utils/isSupportWebp'
import { throttle } from 'lodash-es'
import '@vant/touch-emulator'
import '~/utils/gsap/easeIn'
// import i18n from '~/lang'

import './assets/css/tailwind.css'
import 'vant/es/dialog/style'
import 'vant/es/image-preview/style'
import 'vant/es/notify/style'
import 'vant/es/toast/style'
import '~/assets/css/fixPlugin.css'
import '~/assets/css/main.css'

const _window = parent || window

_window.document.body.style.backgroundColor = import.meta.env.VITE_APP_MAIN_COLOR
_window.document.documentElement.style.setProperty('--main-color', import.meta.env.VITE_APP_MAIN_COLOR)

let lastWidth = _window.innerWidth
_window.addEventListener(
  'resize',
  throttle(() => {
    if (lastWidth !== _window.innerWidth) {
      _window.location.reload()
      lastWidth = _window.innerWidth
    }
  }, 300),
)

if (import.meta.env.VITE_APP_OPENPC == '1') {
  addPcSupport().then(() => {})
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

app.mount('#app')
