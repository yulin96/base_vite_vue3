<script setup lang="ts">
import { useEventListener, useToggle } from '@vueuse/core'

withDefaults(defineProps<{ src: string; playIcon?: string; pausedIcon?: string }>(), {
  playIcon: 'https://oss.eventnet.cn/H5/zz/public/svg/music/music_play.svg',
  pausedIcon: 'https://oss.eventnet.cn/H5/zz/public/svg/music/music_pause.svg',
})

const audio = ref<HTMLAudioElement>()
const playImg = ref<HTMLImageElement>()
const [isPlay, toggleIsPlay] = useToggle(false)

const togglePlayStatus = () => {
  if (!audio.value) return console.error('audio is not ready!')
  if (audio.value.paused) audio.value.play().catch(() => {})
  else audio.value.pause()
}

const clickPlay = (ele: MouseEvent) => {
  if (!audio.value) return console.error('audio is not ready!')
  if (ele.target !== playImg.value && audio.value.paused) audio.value?.play().catch((e) => console.error(e))
}

const cleanupClick = useEventListener(document, 'click', clickPlay, { once: true })
const cleanupTouchend = useEventListener(document, 'touchend', clickPlay, { once: true })

useMediaSession(audio)

/*  */
onMounted(() => {
  document.addEventListener(
    'WeixinJSBridgeReady',
    () => {
      audio.value
        ?.play()
        .then(() => {
          cleanupClick()
          cleanupTouchend()
        })
        .catch(() => {})
    },
    false,
  )
})
</script>

<template>
  <Teleport to="body">
    <div
      class="absolute right-[50px] top-[50px] z-[2001] rounded-[50%] border-[4px] border-[#fff] p-[4px]"
      :class="['invert']"
    >
      <audio
        class="hidden"
        :src="src"
        ref="audio"
        loop
        autoplay
        @play="toggleIsPlay(true)"
        @pause="toggleIsPlay(false)"
      ></audio>
      <img
        class="h-40 w-40 animate-spin-slow"
        :class="[isPlay ? 'running' : 'paused']"
        ref="playImg"
        :src="isPlay ? playIcon : pausedIcon"
        @click="togglePlayStatus"
      />
    </div>
  </Teleport>
</template>
