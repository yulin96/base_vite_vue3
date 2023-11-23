<script setup lang="ts">
const props = defineProps<{ src: string; playIcon?: string; pausedIcon?: string }>()

const audio = ref<HTMLAudioElement | null>(null)
const playImg = ref<HTMLImageElement | null>(null)
const playing = ref(false)

const play_icon = computed(() => props.playIcon || 'https://oss.eventnet.cn/H5/zz/public/svg/music/music_play.svg')
const pause_icon = computed(() => props.pausedIcon || 'https://oss.eventnet.cn/H5/zz/public/svg/music/music_pause.svg')

const toggleMusic = () => {
  if (audio.value?.paused) {
    audio.value?.play()
  } else {
    audio.value?.pause()
  }
}

const control = (ele: MouseEvent) => {
  if (ele?.target != playImg.value && audio.value?.paused) {
    audio.value?.play()
  }
  document.body.removeEventListener('click', control)
}

useMediaSession(audio)

/*  */
onMounted(() => {
  document.addEventListener(
    'WeixinJSBridgeReady',
    () => {
      audio.value?.play()
      document.body.removeEventListener('click', control)
    },
    false,
  )

  document.body.addEventListener('click', control)
})
</script>

<template>
  <teleport to="body">
    <div
      class="absolute right-[50px] top-[50px] z-[200] rounded-[50%] border-[5px] border-[#fff] p-[5px]"
      :class="['invert']">
      <audio
        class="hidden"
        :src="props.src"
        ref="audio"
        loop
        autoplay
        @play="playing = true"
        @pause="playing = false"></audio>
      <img
        class="h-40 w-40 animate-spin-slow"
        :class="[playing ? 'paused' : 'running']"
        :style="{ animationPlayState: playing ? 'running' : 'paused' }"
        ref="playImg"
        :src="playing ? play_icon : pause_icon"
        @click="toggleMusic" />
    </div>
  </teleport>
</template>
