<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

const videoRef = useTemplateRef('videoRef')

const showTips = ref(true)
const test = () => {
  showTips.value = false
  videoRef.value?.play()
}
</script>

<template>
  <section class="index group">
    <main class="content center relative bg-[#FFFFF7]">
      <video
        ref="videoRef"
        src="https://oss.eventnet.cn/H5/zz/auto2/6/a1.mp4"
        class="pointer-events-none w-full object-cover"
        muted
        loop
        poster="https://oss.eventnet.cn/H5/zz/auto2/6/a1.mp4?x-oss-process=video/snapshot,t_1000,f_jpg,m_fast"
        preload="auto"
        playsinline="true"
      ></video>

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
