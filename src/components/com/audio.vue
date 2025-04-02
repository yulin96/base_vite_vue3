<script setup lang="ts">
import { useMediaSession } from '@/hooks/useMediaSession'
import { useEventListener, useToggle } from '@vueuse/core'
import { onMounted, onUnmounted, useTemplateRef } from 'vue'

const {
  playIcon = 'https://oss.eventnet.cn/H5/zz/public/svg/music/music_play.svg',
  pausedIcon = 'https://oss.eventnet.cn/H5/zz/public/svg/music/music_pause.svg',
  position = 'top-right',
  invert = true,
} = defineProps<{
  src: string
  playIcon?: string
  pausedIcon?: string
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  invert?: boolean
}>()

const audioRef = useTemplateRef('audioRef')
const playIconRef = useTemplateRef('playIconRef')

const [isPlay, toggleIsPlay] = useToggle(false)

const togglePlayStatus = () => {
  if (!audioRef.value) {
    return console.error('audio is not ready!')
  }

  if (audioRef.value.paused) {
    audioRef.value.play().catch((err) => {
      console.error('播放失败:', err)
    })
  } else {
    audioRef.value.pause()
  }
}

const clickPlay = (ele: MouseEvent) => {
  if (!audioRef.value) {
    return console.error('audio is not ready!')
  }

  if (ele.target !== playIconRef.value && audioRef.value.paused) {
    audioRef.value.play().catch((err) => {
      console.error('播放失败:', err)
    })
  }
}

const cleanupClick = useEventListener(document, 'click', clickPlay, { once: true })
const cleanupTouchend = useEventListener(document, 'touchend', clickPlay, { once: true })

useMediaSession(audioRef)

let weixinJSBridgeListener: (() => void) | null = null

onMounted(() => {
  weixinJSBridgeListener = () => {
    audioRef.value
      ?.play()
      .then(() => {
        cleanupClick()
        cleanupTouchend()
      })
      .catch((err) => {
        console.error('微信环境下自动播放失败:', err)
      })
  }

  document.addEventListener('WeixinJSBridgeReady', weixinJSBridgeListener, { once: true })
})

onUnmounted(() => {
  if (weixinJSBridgeListener) {
    document.removeEventListener('WeixinJSBridgeReady', weixinJSBridgeListener)
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed z-[2001] rounded-[50%] border-[4px] border-[#fff] p-[4px]"
      :class="{
        'right-50 top-50': position === 'top-right',
        'left-50 top-50': position === 'top-left',
        'bottom-50 right-50': position === 'bottom-right',
        'bottom-50 left-50': position === 'bottom-left',
        invert: invert,
      }"
    >
      <audio
        ref="audioRef"
        class="hidden"
        :src="src"
        loop
        autoplay
        @play="toggleIsPlay(true)"
        @pause="toggleIsPlay(false)"
      ></audio>
      <img
        ref="playIconRef"
        class="size-[40px] animate-spin-slow cursor-pointer"
        :class="{
          'animation-running': isPlay,
          'animation-paused': !isPlay,
        }"
        :src="isPlay ? playIcon : pausedIcon"
        :alt="isPlay ? '正在播放' : '已暂停'"
        @click="togglePlayStatus"
      />
    </div>
  </Teleport>
</template>

<style scoped>
.animation-running {
  animation-play-state: running;
}
.animation-paused {
  animation-play-state: paused;
}
</style>
