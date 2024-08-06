import '~/assets/css/plugin/snow.css'
import { randomNum } from '~/utils/common'

export function useSnow(el: string) {
  onMounted(() => {
    autoCreateSnow(document.getElementById(el) as HTMLDivElement)
  })

  let snowTimer: NodeJS.Timeout | undefined

  onUnmounted(() => {
    clearTimeout(snowTimer)
  })

  let activated = true

  onActivated(() => {
    activated = true
  })

  onDeactivated(() => {
    activated = false
  })

  function autoCreateSnow(wrapper: HTMLDivElement) {
    if (document.visibilityState === 'visible' && activated) createSnow(wrapper)

    snowTimer = setTimeout(
      () => {
        autoCreateSnow(wrapper)
      },
      randomNum(800, 1600)
    )
  }
}

function createSnow(wrapper: HTMLDivElement) {
  if (!wrapper) return

  const snow = document.createElement('div')
  const snowImg = document.createElement('img')
  snowImg.style.width = '100%'
  snowImg.src = 'https://oss.eventnet.cn/H5/zz/public/icon/snow.png'
  snowImg.style.animation = `rotateSnow ${randomNum(30, 60)}s linear infinite`
  snow.appendChild(snowImg)

  snow.style.position = 'fixed'
  snow.style.width = `${randomNum(10, 26)}px`
  snow.style.left = `${Math.random() * 100}%`
  snow.style.bottom = '100%'
  snow.style.zIndex = '1'
  snow.style.pointerEvents = 'none'
  snow.style.opacity = String(randomNum(8, 10) / 10)
  snow.addEventListener(
    'animationend',
    () => {
      wrapper.removeChild(snow)
    },
    { once: true },
  )
  snow.style.animation = `snow ${randomNum(30, 60)}s linear`

  wrapper.appendChild(snow)
}
