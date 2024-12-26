import { debounce } from 'lodash-es'
import { createQRCode } from '~/tools/init/createQRCode'
import { devModel } from '~/utils/global'
import { isMobileFun } from '~/utils/uaParser'

function setRem() {
  const baseSize = 10
  const designWidth = 750
  let clientWidth = document.documentElement.clientWidth

  if (!isMobileFun()) {
    const height = innerHeight
    const width = (375 / 720) * height

    const app = document.querySelector('#app') as HTMLDivElement
    app.style.width = `${width}px`
    app.style.height = `${height}px`

    clientWidth = width

    if (app) {
      app.classList.add('pc')
      createQRCode(app)
    }
  }

  // 计算缩放比例
  const scale = clientWidth / designWidth

  // 设置根元素的 font-size，使用最小比例限制最大缩放
  document.documentElement.style.fontSize = `${baseSize * scale}px`
}

setRem()

if (devModel) {
  let prevWidth = window.innerWidth
  window.onresize = debounce(() => {
    const currentWidth = window.innerWidth
    if (currentWidth !== prevWidth) {
      window.location.reload()
    }
    prevWidth = currentWidth
  }, 500)
}
