// @ts-nocheck
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext

function webAudio(url) {
  let webAudioObj
  const context = new window.AudioContext()
  let gainNode = null
  let source = null
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
  // eslint-disable-next-line no-extra-semi
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
    gainNode = context.createGain()
    source = context.createBufferSource()
    source.buffer = audioBuffer
    source.loop = false
    source.connect(gainNode)
    // source = context.createBufferSource();
    // source.buffer = audioBuffer;
    // source.loop = false;
    // source.connect(context.destination);
    gainNode.connect(context.destination)
    gainNode.gain.value = 0
    source.start()
  }
  return {
    play: playEffect,
    playInit: playEffectInit,
  }
}

export { webAudio }
