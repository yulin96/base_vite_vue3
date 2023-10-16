fetch('https://oss.eventnet.cn/H5/zz/public/lotties/btn/btn3.json')
  .then((res) => res.json())
  .then((res) => {
    window['loadingLottieJson'] = res
  })

export const showLottie = (e: MouseEvent) => {
  if (!window['loadingLottieJson']) return
  const width = 200

  const { clientX, clientY } = e
  const div = document.createElement('div')
  div.style.position = 'fixed'
  div.style.width = `${width}px`
  div.style.height = `${width}px`
  div.style.top = `${clientY - width / 2}px`
  div.style.left = `${clientX - width / 2}px`
  div.style.pointerEvents = 'none'
  div.style.transform = `rotate(${Math.floor(Math.random() * 180)}deg)`
  document.body.appendChild(div)

  const templo = lottie.loadAnimation({
    container: div,
    loop: false,
    autoplay: true,
    animationData: window['loadingLottieJson'],
    renderer: 'canvas',
  })
  templo.setSpeed(1.6)

  templo.addEventListener('complete', () => {
    document.body.removeChild(div)
  })
}
