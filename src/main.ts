import { isAndroid } from './utils/check'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { setToastDefaultOptions } from 'vant'

window[gsapAll] = {}

checkWebpFeature((_, result) => {
  if (result) document.documentElement.classList.add('webp')
}, 'lossless')

import './assets/css/tailwind.css'

import '~/hooks/addPcSupport'

import 'vant/es/dialog/style'
import 'vant/es/image-preview/style'
// import 'vant/es/notify/style'
import 'vant/es/toast/style'

import '~/assets/css/main.css'
import '~/assets/css/fixPlugin.css'

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

if (isSafari() && !isAndroid()) {
  const html = document.querySelector('html')
  const body = document.querySelector('body')
  if (html) html.style.height = window.innerHeight + 'px'
  if (body) body.style.height = window.innerHeight + 'px'
}

const app = createApp(App)

app.directive('focus', (el: HTMLElement) => el.focus())

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(router)

app.mount('#app')
