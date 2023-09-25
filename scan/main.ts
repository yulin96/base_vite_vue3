import { isAndroid, isSafari } from '@/utils/check'
import { checkWebpFeature } from '@/utils/issupportwebp'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'

checkWebpFeature((_, result) => {
  if (result) document.documentElement.classList.add('webp')
}, 'lossless')

import 'vant/es/dialog/style'
import 'vant/es/image-preview/style'
// import 'vant/es/notify/style'
import 'vant/es/toast/style'
import '@/assets/css/main.css'
import '@/assets/css/fixPlugin.css'
import '@/assets/css/tailwind.css'

if (isSafari() && !isAndroid()) {
  const html = document.querySelector('html')
  const body = document.querySelector('body')
  if (html) html.style.height = window.innerHeight + 'px'
  if (body) body.style.height = window.innerHeight + 'px'
}

const app = createApp(App)

app.use(router)

app.mount('#app')
