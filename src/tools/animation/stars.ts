import gsap from 'gsap'
import { random } from 'gsap/all'

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
      starsBox.children.length > 30 ? Math.floor(random(600, 1000)) : Math.floor(random(50, 100)),
    )
  }
  loopCreate()
}

function createStar(starsBox: HTMLDivElement) {
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
  gsap
    .to(star, {
      duration: random(2, 3),
      opacity: random(0.8, 1),
      scale: random(1, 2),
      ease: random(['power1.inOut', 'power2.inOut', 'power3.inOut', 'none']),
      yoyo: true,
      repeat: 1,
    })
    .then(() => {
      starsBox.removeChild(star)
    })
}
