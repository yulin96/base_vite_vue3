import { useDocumentVisibility } from '@vueuse/core'
import gsap from 'gsap'
import { randomNum } from '~/utils/common'

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
      starsBox.children.length > 30
        ? Math.floor(randomNum(600, 1000))
        : Math.floor(randomNum(50, 100)),
    )
  }
  loopCreate()
}

function createStar(starsBox: HTMLDivElement) {
  const star = document.createElement('img')
  star.src = 'https://oss.eventnet.cn/H5/zz/public/icon/stars.png'
  const size = Math.floor(randomNum(6, 20))
  star.style.width = `${size}px`
  star.style.height = `${size}px`
  star.style.opacity = '0'
  star.style.position = 'absolute'
  star.style.transform = `rotate(${randomNum(0, 360)}deg)`
  star.style.left = `${Math.floor(randomNum(0, starsBox.clientWidth - 0))}px`
  star.style.top = `${Math.floor(randomNum(0, starsBox.clientHeight - 0))}px`

  starsBox.appendChild(star)
  gsap
    .to(star, {
      duration: randomNum(2, 3),
      opacity: randomNum(0.8, 1),
      scale: randomNum(1, 2),
      ease: ['power1.inOut', 'power2.inOut', 'power3.inOut', 'none'][randomNum(0, 3)],
      yoyo: true,
      repeat: 1,
    })
    .then(() => {
      starsBox.removeChild(star)
    })
}
