fetch('https://oss.eventnet.cn/H5/zz/public/lotties/btn/btn1.json')
  .then((res) => res.json())
  .then((res) => {
    window['loadingLottieJson'] = res
  })

export const showLottie = (e: MouseEvent) => {
  if (!window['loadingLottieJson']) return

  const { clientX, clientY, pointerId } = e as PointerEvent

  const div = document.createElement('div')
  div.style.position = 'fixed'
  div.style.width = '300px'
  div.style.height = '300px'
  div.style.top = `${clientY - 150}px`
  div.style.left = `${clientX - 150}px`
  div.style.pointerEvents = 'none'
  document.body.appendChild(div)

  const tempid = `tempid${pointerId}`
  window[tempid] = lottie.loadAnimation({
    container: div,
    renderer: 'svg',
    loop: false,
    autoplay: true,
    animationData: window['loadingLottieJson'],
  })
  window[tempid].addEventListener('complete', () => {
    document.body.removeChild(div)
    delete window[tempid]
  })
}
