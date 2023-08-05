import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setToastDefaultOptions } from 'vant'

import '~/utils/vconsole'
import '~/hooks/addPcSupport'

import 'vant/es/dialog/style'
import 'vant/es/image-preview/style'
// import 'vant/es/notify/style'
import 'vant/es/toast/style'

import '~/assets/css/main.css'
import '~/assets/css/fixPlugin.css'
// import '~/assets/css/fixSafari.css'

setToastDefaultOptions({
  forbidClick: true,
  overlay: true,
  duration: 1200,
  overlayClass: 'center_toast_overlay',
  transition: 'center_fromTop_toast',
  position: 'middle',
  className: 'center_toast',
})

// const html = document.querySelector('html')
// const body = document.querySelector('body')
// if (html) html.style.height = window.innerHeight + 'px'
// if (body) body.style.height = window.innerHeight + 'px'

const app = createApp(App)

app.directive('focus', (el: HTMLElement) => el.focus())

app.use(createPinia())
app.use(router)

app.mount('#app')
