import QRCode from 'qrcode'
import { removeUrlParams } from '~/utils/common'

export function createQRCode(app: HTMLDivElement) {
  if (document.querySelector('.code-tips.pc')) document.body.removeChild(document.querySelector('.code-tips.pc')!)

  const pageURL = location.href.replace('pc.html', 'index.html')
  const clearedUrl = removeUrlParams(pageURL, 't')

  QRCode.toDataURL(clearedUrl, { margin: 2, errorCorrectionLevel: 'H', width: 900 }).then((res) => {
    const left = Math.round(app.getBoundingClientRect().right + 30)

    const div = document.createElement('div')
    div.style.left = `${left}px`
    div.classList.add('code-tips')
    div.classList.add('pc')

    const image = document.createElement('img')
    image.src = res
    div.appendChild(image)
    image.onclick = () => {
      const a = document.createElement('a')
      a.href = res
      a.download = `【二维码】${document.title}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }

    const p = document.createElement('p')
    p.innerHTML = '手机扫码查看'
    div.appendChild(p)

    document.body.appendChild(div)
  })
}