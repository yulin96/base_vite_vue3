import { webAudio } from './webAudios'

const needMusic = false

const url = 'https://oss.eventnet.cn/H5/Aodi/2211/an.mp3'

const audioControl = needMusic
  ? webAudio(url)
  : {
      play: () => {},
      playInit: () => {},
    }

export const playClickMusic = (): void => {
  audioControl?.play()
}

needMusic &&
  document.body.addEventListener(
    'click',
    () => {
      audioControl.playInit()
    },
    { once: true },
  )
