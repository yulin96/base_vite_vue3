export const useMediaSession = (ele: Ref<HTMLAudioElement | undefined>, option?: MediaMetadata) => {
  if (!(ele.value instanceof HTMLMediaElement && 'mediaSession' in navigator)) return

  onMounted(() => {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: option?.title || import.meta.env.VITE_APP_SHARE_TITLE || import.meta.env.VITE_APP_TITLE,
      artist: option?.artist || import.meta.env.VITE_APP_SHARE_DESC,
      album: option?.album || import.meta.env.VITE_APP_SHARE_TITLE || import.meta.env.VITE_APP_TITLE,
      artwork: option?.artwork
        ? [...option.artwork]
        : [
            {
              src: import.meta.env.VITE_APP_SHARE_IMGURL || 'https://oss.eventnet.cn/H5/zz/public/favicon.png',
            },
          ],
    })
    navigator.mediaSession.setActionHandler('play', () => {
      ele.value?.play().catch(() => {})
    })
    navigator.mediaSession.setActionHandler('pause', function () {
      ele.value?.pause()
    })
  })

  onUnmounted(() => {
    navigator.mediaSession.setActionHandler('play', null)
    navigator.mediaSession.setActionHandler('pause', null)
  })
}
