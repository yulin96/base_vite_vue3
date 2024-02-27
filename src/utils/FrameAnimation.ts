interface FrameAnimationOption {
  el: string | HTMLCanvasElement // canvas元素id或者canvas元素
  urlPrefix: string // 图片路径前缀
  urlSuffix: string // 图片路径后缀
  maxLength: number // 图片最大序号

  initIndex?: number // 初始化序号
  autoPlay?: boolean // 是否自动播放
  poster?: string // 是否需要封面图片
  loop?: boolean // 是否循环播放
  loopStartIndex?: 1 // 循环开始序号
  loopEndIndex?: 20 // 循环结束序号
}

//图片序列帧动画
export default class FrameAnimation {
  public canPlay = false
  public cycles = 0
  private animationElement: HTMLCanvasElement
  private animationCtx: CanvasRenderingContext2D
  private width: number
  private height: number

  constructor(option: FrameAnimationOption) {
    if (typeof option.el === 'string') {
      const el = document.querySelector(option.el)
      if (el instanceof HTMLCanvasElement) {
        this.animationElement = el
      } else {
        throw new Error('使用querySelector查询不到canvas元素')
      }
    } else {
      this.animationElement = option.el
    }
    this.animationCtx = this.animationElement.getContext('2d')!
    this.width = this.animationElement.clientWidth * window.devicePixelRatio
    this.height = this.animationElement.clientHeight * window.devicePixelRatio
    this.animationElement.width = this.width
    this.animationElement.height = this.height

    this.initHeight()
    this.init(option)
  }

  private initHeight() {}

  private async init(option: FrameAnimationOption) {
    const { maxLength, initIndex = 1, urlPrefix, urlSuffix, autoPlay = true, poster } = option

    if (poster) {
      const img = await loadImg(poster)

      this.animationCtx.drawImage(img, 0, 0, this.width, this.height)
    }

    const imgLength = maxLength - initIndex + 1
    const imgList = Array.from({ length: imgLength }, (_, i) => loadImg(`${urlPrefix}${i + initIndex}${urlSuffix}`))

    let index = 0
    for await (const _ of imgList) index++
    if (index !== imgLength) return console.error('图片加载失败')
    this.canPlay = true
    if (autoPlay) this.play()
  }

  public play() {
    console.log('play')
    console.log(this.animationElement)
  }

  public pause() {}

  public stop() {}
}

async function loadImg(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}
