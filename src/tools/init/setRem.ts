import '@/assets/css/pc.css'
import { createQRCode, removeQRCode } from '@/tools/init/createQRCode'
import { isMobile } from '@/utils/uaParser'
import { debounce } from 'es-toolkit'

function setRem() {
  const baseSize = 10
  const designWidth = 750
  let deviceWidth = innerWidth

  if (!isMobile() || deviceWidth > 640) {
    const calcHeight = innerHeight
    const calcWidth = (375 / 720) * calcHeight

    const app = document.querySelector('#app') as HTMLDivElement
    app.style.width = `${calcWidth}px`
    app.style.height = `${calcHeight}px`

    deviceWidth = calcWidth

    if (app) {
      app.classList.add('pc')
      innerWidth >= 1000 && createQRCode(app)
    }
  } else {
    const app = document.querySelector('#app') as HTMLDivElement
    if (app) {
      app.classList.remove('pc')
    }
    app.setAttribute('style', '')
    removeQRCode()
  }

  const scale = deviceWidth / designWidth

  document.documentElement.style.fontSize = `${baseSize * scale}px`
}

setRem()

window.addEventListener(
  'resize',
  debounce(() => {
    setRem()
  }, 100),
)
