import { useDocumentVisibility } from '@vueuse/core'
import { random, randomInt, sample } from 'es-toolkit'
import { gsap } from 'gsap'

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
      starsBox.children.length > 20 ? randomInt(600, 1000) : randomInt(50, 100),
    )
  }
  loopCreate()
}

async function createStar(starsBox: HTMLDivElement) {
  const star = document.createElement('img')
  star.src = 'https://oss.eventnet.cn/H5/zz/public/icon/stars.png'
  const size = Math.floor(randomInt(6, 20))
  star.style.width = `${size}px`
  star.style.height = `${size}px`
  star.style.opacity = '0'
  star.style.position = 'absolute'
  star.style.transform = `rotate(${randomInt(0, 360)}deg)`
  star.style.left = `${Math.floor(randomInt(0, starsBox.clientWidth - 0))}px`
  star.style.top = `${Math.floor(randomInt(0, starsBox.clientHeight - 0))}px`

  starsBox.appendChild(star)

  await gsap.to(star, {
    opacity: randomTwoFloat(0.8, 1),
    scale: randomTwoFloat(1, 2),
    duration: randomTwoFloat(2, 4),
    repeat: 1,
    yoyo: true,
    ease: randomCubicBezier(),
    repeatDelay: randomTwoFloat(0.6, 1),
    onComplete: () => {
      if (starsBox && star.parentNode === starsBox) {
        starsBox.removeChild(star)
      }
    },
  })

  function randomCubicBezier() {
    return sample([
      'cubic-bezier(0.33, 0.75, 0.19, 1)',
      'cubic-bezier(0.62, 0.68, 0.67, 0.99)',
      'cubic-bezier(0.09, 0.67, 0.06, 0.98)',
      'cubic-bezier(0.42, 0.81, 0.72, 1.13)',
      'cubic-bezier(0.71, 0.47, 0.45, 0.98)',
    ])
  }

  function randomTwoFloat(min: number, max: number) {
    return +random(min, max).toFixed(2)
  }
}
