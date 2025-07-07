const shareUrl = import.meta.env.VITE_APP_SHARE_IMGURL

window.addEventListener('load', () => {
  if (shareUrl) {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const dpr = window.devicePixelRatio || 1

        canvas.width = img.width * dpr
        canvas.height = img.height * dpr

        canvas.style.width = img.width + 'px'
        canvas.style.height = img.height + 'px'

        ctx.scale(dpr, dpr)

        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'

        ctx.drawImage(img, 0, 0)

        const borderRadius = 6
        ctx.globalCompositeOperation = 'destination-in'
        ctx.beginPath()
        ctx.roundRect(0, 0, img.width, img.height, borderRadius)
        ctx.fill()

        ctx.globalCompositeOperation = 'source-over'

        const badgeSize = 60
        const margin = 12
        const x = img.width - badgeSize - margin
        const y = img.height - badgeSize - margin

        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(x + badgeSize / 2, y + badgeSize / 2, badgeSize / 2, 0, 2 * Math.PI)
        ctx.fill()

        ctx.font = `${badgeSize * 0.6}px Arial`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('🤖', x + badgeSize / 2, y + badgeSize / 2)

        const dataUrl = canvas.toDataURL('image/png', 1.0)
        console.log('%c ', `padding: 100px; background: url(${dataUrl}) no-repeat; background-size: contain;`)
      }
    }
    img.src = shareUrl
  }
})
