import QRCode from 'qrcode'
import { isMobile } from '~/utils/uaParser'

if (isMobile) {
  const paramsSearch = new URLSearchParams(window.location.search)
  const params: { [x: string]: string } = {}

  for (const key of paramsSearch.keys()) {
    params[key] = paramsSearch.get(key) ?? ''
  }

  let urlParams = ''
  for (const key in params) urlParams += (urlParams ? '&' : '?') + `${key}=${params[key]}`
  location.replace('./index.html' + urlParams)
}

const scale = 1410 / 750
const iframe = document.getElementById('FIX_PC') as HTMLIFrameElement
iframe.style.boxShadow = '#0000001f 0px 1px 3px,#0000003d 0px 1px 2px'

if (import.meta.env.VITE_APP_OPENPC_FULL === '1') {
  const needHeight = Math.floor(innerHeight * 0.91)

  iframe.style.height = `${needHeight}px`
  iframe.style.width = `${needHeight / scale}px`
  iframe.style.marginTop = `${(innerHeight - needHeight) / 6}px`
} else {
  const width = import.meta.env.VITE_APP_OPENPC_WIDTH
  iframe.style.width = `${width}px`
  iframe.style.height = `${innerHeight}px`

  const trueHeight = scale * width

  if (trueHeight < innerHeight) {
    iframe.style.height = `${trueHeight}px`
    iframe.style.marginTop = '12px'
    iframe.style.borderRadius = '12px'
  }
}

const urlParams = new URLSearchParams(location.search)
let urlSearchList = ''
urlParams.forEach((item, key) => (urlSearchList += `${urlSearchList ? '&' : '?'}${key}=${item}`))
urlSearchList += `${urlSearchList ? '&' : '?'}device=PC`
iframe.src = `./index.html${urlSearchList}`

const pageURL = location.href.replace('pc.html', 'index.html')
QRCode.toDataURL(pageURL, { margin: 2, errorCorrectionLevel: 'H', width: 900 }).then((res) => {
  const left = Math.round(iframe.getBoundingClientRect().right + 30)

  const div = document.createElement('div')
  div.style.left = `${left}px`
  div.classList.add('code-tips')

  const image = document.createElement('img')
  image.src = res
  div.appendChild(image)

  const p = document.createElement('p')
  p.innerHTML = '手机扫码查看'
  div.appendChild(p)

  document.body.appendChild(div)
})
