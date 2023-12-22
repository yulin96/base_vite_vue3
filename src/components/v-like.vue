<script setup lang="ts">
import { type AnimationItem } from 'lottie-web'

const props = defineProps<{ like: boolean; json: any }>()

// fetch('https://oss.eventnet.cn/H5/zz/public/lotties/like/like1.json')
//   .then((res) => res.json())
//   .then((res) => {
//     window['lottieJson-like'] = res
//   })

const likeEle = ref<HTMLDivElement | null>(null)

let lottieLike: AnimationItem

watchPostEffect(() => {
  if (props.like) {
    lottieLike?.goToAndPlay(0, true)
  } else {
    lottieLike?.goToAndStop(0, true)
  }
})

/*  */
onMounted(() => {
  if (!likeEle.value) return console.error('likeEle is null')
  lottieLike = lottie.loadAnimation({
    container: likeEle.value,
    loop: false,
    autoplay: false,
    renderer: 'canvas',
    animationData: props.json,
  })

  lottieLike.addEventListener('config_ready', () => {
    lottieLike.goToAndStop(props.like ? lottieLike.totalFrames - 1 : 0, true)
  })
})

onUnmounted(() => {
  lottieLike?.destroy()
})
</script>

<template>
  <div class="h-100 w-100">
    <div class="h-full w-full scale-[1.2]" ref="likeEle"></div>
  </div>
</template>
