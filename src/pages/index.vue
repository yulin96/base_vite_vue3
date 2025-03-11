<script setup lang="ts">
import { useUrlSearchParams } from '@vueuse/core'
import { ref, useTemplateRef } from 'vue'

const params = useUrlSearchParams()
const id = Object.keys(params)[0]

const videoMap = {
  9: 'https://oss.eventnet.cn/H5/zz/auto2/6/b/09.30-1.mp4',
  10: 'https://oss.eventnet.cn/H5/zz/auto2/6/b/10.30-1.mp4',
  12: 'https://oss.eventnet.cn/H5/zz/auto2/6/b/12.30-1.mp4',
  13: 'https://oss.eventnet.cn/H5/zz/auto2/6/b/13.30-1.mp4',
  14: 'https://oss.eventnet.cn/H5/zz/auto2/6/b/14.30-1.mp4',
  15: 'https://oss.eventnet.cn/H5/zz/auto2/6/b/15.30-1.mp4',
  16: 'https://oss.eventnet.cn/H5/zz/auto2/6/b/16.30-1.mp4',
}
const videoURL = videoMap[id] || 'https://oss.eventnet.cn/H5/zz/auto2/6/b/16.30-1.mp4'

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
