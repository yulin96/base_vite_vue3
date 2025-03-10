<script setup lang="ts">
import gsap from 'gsap'
import { ref, useTemplateRef } from 'vue'

const videoRef = useTemplateRef('videoRef')

const showTips = ref(true)
const test = () => {
  videoRef.value?.play()
  showTips.value = false

  gsap.to('[t1]', { stagger: 0.2, opacity: 1, duration: 3, ease: 'none' })
}
</script>

<template>
  <section class="index group">
    <main class="content center relative bg-[#FFFFF7]">
      <video
        ref="videoRef"
        src="https://oss.eventnet.cn/H5/zz/auto2/6/a1.mp4"
        class="w-full object-cover"
        muted
        loop
        poster="https://oss.eventnet.cn/H5/zz/auto2/6/a1.mp4?x-oss-process=video/snapshot,t_1000,f_jpg,m_fast"
        controls="true"
        preload="auto"
        x5-video-player-fullscreen="true"
        webkit-playsinline="true"
        playsinline="true"
        x5-video-orientation="portraint"
        x-webkit-airplay="allow"
        x5-video-player-type="h5-page"
      ></video>

      <div class="pointer-events-none absolute z-20 -mt-30 flex w-full flex-col items-center">
        <img t1 class="w-350 opacity-0" src="../assets/imgs/2x/images/p1@2x_01.png" />
        <img t1 class="w-350 opacity-0" src="../assets/imgs/2x/images/p1@2x_02.png" />
        <img t1 class="w-350 opacity-0" src="../assets/imgs/2x/images/p1@2x_03.png" />
        <img t1 class="w-350 opacity-0" src="../assets/imgs/2x/images/p1@2x_04.png" />
        <img t1 class="w-350 opacity-0" src="../assets/imgs/2x/images/p1@2x_05.png" />
      </div>

      <div
        v-if="showTips"
        class="center absolute left-0 top-0 h-full w-full bg-[#0003]"
        @click="test"
      >
        <img class="-mt-120 w-120" src="../assets/imgs/play2.png" />
      </div>
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
