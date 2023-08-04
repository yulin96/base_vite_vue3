import { webAudio } from './webAudios'

export const NEED_CLICK_MUSIC = false

export const CLICK_MUSIC = 'https://oss.eventnet.cn/H5/Aodi/2211/an.mp3'

const audioControl = NEED_CLICK_MUSIC ? webAudio(CLICK_MUSIC) : { play: () => {} }

export const playClickMusic = (): void => {
  audioControl?.play()
}
