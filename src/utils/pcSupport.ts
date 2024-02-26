import { isMobile } from '~/utils/tools/ua-parser'

if (isMobile) {
  location.replace('./index.html')
}

const scale = 1410 / 750
const iframe = document.getElementById('FIX_PC') as HTMLIFrameElement

if (import.meta.env.VITE_APP_OPENPC_FULL === '1') {
  const needHeight = Math.floor(innerHeight * 0.91)

  iframe.style.height = needHeight + 'px'
  iframe.style.width = needHeight / scale + 'px'
  iframe.style.marginTop = (innerHeight - needHeight) / 6 + 'px'
  iframe.style.borderRadius = '12px'
} else {
  const width = import.meta.env.VITE_APP_OPENPC_WIDTH
  iframe.style.width = width + 'px'
  iframe.style.height = innerHeight + 'px'

  const trueHeight = scale * width

  if (trueHeight < innerHeight) {
    iframe.style.height = trueHeight + 'px'
    iframe.style.marginTop = '12px'
    iframe.style.borderRadius = '12px'
  }
}

const urlParams = new URLSearchParams(location.search)
let urlSearchList = ''
urlParams.forEach((item, key) => (urlSearchList += `${urlSearchList ? '&' : '?'}${key}=${item}`))
urlSearchList += `${urlSearchList ? '&' : '?'}device=PC`
iframe.src = `./index.html${urlSearchList}`
