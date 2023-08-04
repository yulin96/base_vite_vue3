export class CA {
  constructor(option) {
    this.option = option
    this.imgArr = []
    this.canvas = document.getElementById(this.option.el)
    this.xtc = this.canvas.getContext('2d')
    this.CW
    this.CH
    this.CreatImgList()
    this.fmer
    this.frameIndex = 0
    this.framePlaying = false
  }
  CreatImgList() {
    let THAT = this
    ;(function () {
      for (let i = 1; i < THAT.option.MaxL + 1; i++) {
        const img = new Image()
        img.onload = function () {
          THAT.imgArr[i - 1] = img /*有可能图片加载有快有满慢，所以用角标存*/
          if (i === 1) {
            THAT.CW = img.width * THAT.option.dpr
            THAT.CH = img.height * THAT.option.dpr
            THAT.canvas.width = THAT.CW
            THAT.canvas.height = THAT.CH
            THAT.OnRady()
          }
        }
        img.src = THAT.option.urllt + i + THAT.option.suffix
        img.onerror = function (e) {
          console.log(e)
        }
      }
    })()
  }
  OnRady() {
    let THAT = this
    this.xtc.clearRect(0, 0, this.CW, this.CH)
    this.xtc.save()
    let ia = new Image()
    ia.onload = function () {
      THAT.xtc.drawImage(ia, 0, 0, THAT.CW, THAT.CH)
    }
    if (this.option.positer) ia.src = this.option.positerUrl
    else this.xtc.drawImage(this.imgArr[0], 0, 0, THAT.CW, THAT.CH)
  }
  play() {
    if (this.framePlaying) {
      return
    }
    this.fmer = setInterval(() => {
      this.frameIndex++
      this.xtc.clearRect(0, 0, this.CW, this.CH)
      let THAT = this
      if (this.frameIndex < this.imgArr.length - 1 && this.imgArr[this.frameIndex] == undefined) {
        let img = new Image()
        img.onload = function () {
          THAT.imgArr[THAT.frameIndex] = img
        }
        img.src = THAT.option.urllt + THAT.frameIndex + THAT.option.suffix
      } else if (this.imgArr[this.frameIndex]) {
        this.xtc.drawImage(this.imgArr[this.frameIndex], 0, 0, this.CW, this.CH)
      } else {
        this.frameIndex = 0
      }
      let RLT = 0
      if (this.option.replayLoopTo) {
        RLT = this.option.replayLoopTo
      } else {
        RLT = this.imgArr.length - 1
      }
      if (this.option.loop && this.frameIndex == RLT) {
        clearInterval(this.fmer)
        if (this.option.replayLoopFrom) {
          this.frameIndex = this.option.replayLoopFrom
        } else {
          this.frameIndex = 0
        }
        this.framePlaying = false
        this.play()
      } else if (this.frameIndex == RLT) {
        clearInterval(this.fmer)
        this.framePlaying = false
        this.frameIndex = 0
      }
    }, 1000 / this.option.frame)
    return this
  }
  paused() {
    // this.framePlaying = true
    clearInterval(this.fmer)
  }
  frameI() {
    return this.frameIndex
  }
}
// let viker = new CA({
//     urllt: 'static/images/down/D',
//     suffix: '.png',
//     MaxL: 19,
//     el: 'canvas',
//     dpr: 1,
//     positer: true,
//     positerUrl: 'static/images/down/d4.png',
//     loop: true,
//     replayLoopTo:19,
//     replayLoopFrom:0,
//     frame: 24,
// }).play();

// let vcar = new CA({
//     urllt: 'static/images/car/c',
//     suffix: '.png',
//     MaxL: 23,
//     el: 'vcar',
//     dpr: 1,
//     positer: true,
//     positerUrl: 'static/images/car/c1.png',
//     loop: true,
//     frame: 20,
// }).play();
