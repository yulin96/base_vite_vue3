import { useDocumentVisibility } from '@vueuse/core'
import { random, sample } from 'lodash-es'
import { animate, cubicBezier } from 'motion'

export function createStars(starsBox: HTMLDivElement) {
  const style = window.getComputedStyle(starsBox)
  const position = style.position
  if (!position) {
    starsBox.style.position = 'relative'
  }

  const visibility = useDocumentVisibility()

  const loopCreate = () => {
    setTimeout(
      () => {
        loopCreate()
        if (visibility.value === 'visible') createStar(starsBox)
      },
      starsBox.children.length > 20 ? random(600, 1000) : random(50, 100),
    )
  }
  loopCreate()
}

async function createStar(starsBox: HTMLDivElement) {
  const star = document.createElement('img')
  star.src = 'https://oss.eventnet.cn/H5/zz/public/icon/stars.png'
  const size = Math.floor(random(6, 20))
  star.style.width = `${size}px`
  star.style.height = `${size}px`
  star.style.opacity = '0'
  star.style.position = 'absolute'
  star.style.transform = `rotate(${random(0, 360)}deg)`
  star.style.left = `${Math.floor(random(0, starsBox.clientWidth - 0))}px`
  star.style.top = `${Math.floor(random(0, starsBox.clientHeight - 0))}px`

  starsBox.appendChild(star)

  await animate(
    star,
    { opacity: randomTwoFloat(0.8, 1), scale: randomTwoFloat(1, 2) },
    {
      duration: randomTwoFloat(2, 4),
      repeat: 1,
      repeatType: 'reverse',
      ease: randomCubicBezier(),
      repeatDelay: randomTwoFloat(0.6, 1),
    },
  )
  starsBox.removeChild(star)

  function randomCubicBezier() {
    return sample([
      cubicBezier(0.33, 0.75, 0.19, 1),
      cubicBezier(0.62, 0.68, 0.67, 0.99),
      cubicBezier(0.09, 0.67, 0.06, 0.98),
      cubicBezier(0.42, 0.81, 0.72, 1.13),
      cubicBezier(0.71, 0.47, 0.45, 0.98),
    ])
  }

  function randomTwoFloat(min: number, max: number) {
    return +random(min, max, true).toFixed(2)
  }
}
