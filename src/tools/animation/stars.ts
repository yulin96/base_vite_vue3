import gsap from 'gsap'
import { random } from 'gsap/all'

export const createStars = (element: HTMLDivElement) => {
  const loopCreate = () => {
    setTimeout(
      () => {
        createStar(element)
        loopCreate()
      },

      element.children.length > 30 ? Math.floor(random(600, 1000)) : Math.floor(random(50, 100)),
    )
  }
  loopCreate()
}

function createStar(starsWrapper: HTMLDivElement) {
  const star = document.createElement('img')
  star.src = 'https://oss.eventnet.cn/H5/zz/public/icon/stars.png'
  const size = Math.floor(random(6, 20))
  star.style.width = `${size}px`
  star.style.height = `${size}px`
  star.style.opacity = '0'
  star.style.position = 'absolute'
  star.style.transform = `rotate(${random(0, 360)}deg)`
  star.style.left = `${Math.floor(random(0, innerWidth - 0))}px`
  star.style.top = `${Math.floor(random(0, innerHeight - 0))}px`

  starsWrapper.appendChild(star)
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
      starsWrapper.removeChild(star)
    })
}
