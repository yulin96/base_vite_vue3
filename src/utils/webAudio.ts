//@ts-expect-error 兼容性问题
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext

export function webAudio(url: string) {
  const context = new window.AudioContext()
  let source: AudioBufferSourceNode | null = null
  let audioBuffer = null

  function initSound(arrayBuffer) {
    context.decodeAudioData(arrayBuffer, initSoundSuccess, initSoundError)
  }

  function initSoundSuccess(buffer) {
    // 解码成功回调
    audioBuffer = buffer
  }

  function initSoundError(e) {
    // 解码失败回调
    console.log('Error decoding file', e)
  }

  ;(function loadAudioFile(url) {
    const xhr = new XMLHttpRequest() // 通过XHR下载音频文件
    xhr.open('GET', url, true)
    xhr.responseType = 'arraybuffer'
    xhr.onload = function (e) {
      // 下载完成
      initSound(this.response)
    }
    xhr.send()
  })(url)

  function playEffect() {
    source = context.createBufferSource()
    source.buffer = audioBuffer
    source.loop = false
    source.connect(context.destination)
    source.start()
  }

  function playEffectInit() {
    source = context.createBufferSource()
    source.buffer = audioBuffer
    source.loop = false
    source.connect(context.destination)
    source.start()
    source.stop()
  }

  return {
    play: playEffect,
    playInit: playEffectInit,
  }
}
