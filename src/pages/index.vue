<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

const videoURL = window.base_video_url
const videoRef = useTemplateRef('videoRef')

const showTips = ref(true)
const test = () => {
  videoRef.value?.play()
  showTips.value = false
}
</script>

<template>
  <section class="index group">
    <main class="content center bg-[#FFFFF7]">
      <video
        ref="videoRef"
        :src="videoURL"
        class="w-full object-cover"
        playsinline
        muted
        loop
        :poster="`${videoURL}?x-oss-process=video/snapshot,t_1000,w_690,h_1234,f_jpg,m_fast`"
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
