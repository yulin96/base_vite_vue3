import { onMounted, onUnmounted } from 'vue'

interface IMetaData {
  title?: string
  artist?: string
  album?: string
  artwork?: Array<{ src: string }>
}

export const useMediaSession = (ele: Ref<HTMLMediaElement | null>, option?: IMetaData) => {
  onMounted(() => {
    if (!(ele.value instanceof HTMLMediaElement)) return null
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: option?.title || import.meta.env.VITE_APP_SHARE_TITLE || import.meta.env.VITE_APP_TITLE,
        artist: option?.artist || import.meta.env.VITE_APP_SHARE_DESC,
        album: option?.album || import.meta.env.VITE_APP_SHARE_TITLE || import.meta.env.VITE_APP_TITLE,
        artwork: option?.artwork || [
          {
            src: import.meta.env.VITE_APP_SHARE_IMGURL || 'https://oss.eventnet.cn/H5/zz/public/favicon.png',
          },
        ],
      })
      navigator.mediaSession.setActionHandler('play', function () {
        ele.value?.play()
      })
      navigator.mediaSession.setActionHandler('pause', function () {
        ele.value?.pause()
      })
    }
  })

  onUnmounted(() => {
    if (!(ele.value instanceof HTMLMediaElement)) return null
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', null)
      navigator.mediaSession.setActionHandler('pause', null)
    }
  })
}
