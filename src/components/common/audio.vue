<script setup lang="ts">
import { useEventListener, useToggle } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const {
  playIcon = 'https://oss.eventnet.cn/H5/zz/public/svg/music/music_play.svg',
  pausedIcon = 'https://oss.eventnet.cn/H5/zz/public/svg/music/music_pause.svg',
} = defineProps<{ src: string; playIcon?: string; pausedIcon?: string }>()

const audioRef = useTemplateRef('audioRef')
const playIconRef = useTemplateRef('playIconRef')

const [isPlay, toggleIsPlay] = useToggle(false)

const togglePlayStatus = () => {
  if (!audioRef.value) return console.error('audio is not ready!')
  if (audioRef.value.paused) audioRef.value.play().catch(() => {})
  else audioRef.value.pause()
}

const clickPlay = (ele: MouseEvent) => {
  if (!audioRef.value) return console.error('audio is not ready!')
  if (ele.target !== playIconRef.value && audioRef.value.paused) audioRef.value?.play().catch((e) => console.error(e))
}

const cleanupClick = useEventListener(document, 'click', clickPlay, { once: true })
const cleanupTouchend = useEventListener(document, 'touchend', clickPlay, { once: true })

useMediaSession(audioRef)

/*  */
onMounted(() => {
  document.addEventListener(
    'WeixinJSBridgeReady',
    () => {
      audioRef.value
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
  <teleport to="body">
    <div
      class="absolute right-[50px] top-[50px] z-[2001] rounded-[50%] border-[4px] border-[#fff] p-[4px]"
      :class="['invert']"
    >
      <audio
        class="hidden"
        :src="src"
        ref="audioRef"
        loop
        autoplay
        @play="toggleIsPlay(true)"
        @pause="toggleIsPlay(false)"
      ></audio>
      <img
        class="h-40 w-40 animate-spin-slow"
        :class="[isPlay ? 'running' : 'paused']"
        ref="playIconRef"
        :src="isPlay ? playIcon : pausedIcon"
        @click="togglePlayStatus"
      />
    </div>
  </teleport>
</template>
