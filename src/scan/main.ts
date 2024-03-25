import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { setDialogDefaultOptions, setNotifyDefaultOptions, setToastDefaultOptions } from 'vant'
import { createApp } from 'vue'
import { checkWebpFeature } from '~/utils/checkWebpFeature'
import App from './App.vue'
import { scanRouter } from './router'

checkWebpFeature((_, result) => {
  if (result) document.documentElement.classList.add('webp')
}, 'lossless')

import 'vant/es/dialog/style'
import 'vant/es/image-preview/style'
import 'vant/es/notify/style'
import 'vant/es/toast/style'

import '~/assets/css/main.css'

!devModel && getWxConfig()

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
setToastDefaultOptions('loading', { duration: 0 })

const app = createApp(App)

app.directive('focus', (el: HTMLElement) => el.focus())

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(scanRouter)

app.mount('#app')
