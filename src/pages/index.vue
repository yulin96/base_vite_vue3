<script setup lang="ts">
import FrameAnimation from '~/utils/FrameAnimation'
import { CanvasAnimation } from '~/utils/canvasAnimation'

/*  */
onMounted(() => {
  gsap.context(() => {}, '.index')

  new CanvasAnimation({
    urlPrefix: 'https://oss.eventnet.cn/H5/zz/auto/ehairudi_20240222/x/s2/',
    suffix: '.webp',
    MaxL: 34,
    el: 'effect2',
    dpr: 1,
    poster: true,
    posterUrl: 'https://oss.eventnet.cn/H5/zz/auto/ehairudi_20240222/x/s2/0.webp',
    loop: true,
    frame: 16,
    gap: 0,
  }).play()

  new FrameAnimation({
    el: '#effect3',
    urlPrefix: 'https://oss.eventnet.cn/H5/zz/auto/ehairudi_20240222/x/s2/',
    urlSuffix: '.webp',
    maxLength: 34,
    loop: true,
    initIndex: 10,
    autoPlay: true,

    poster: 'https://oss.eventnet.cn/H5/zz/auto/ehairudi_20240222/x/s2/1.webp',
  })
})
</script>

<template>
  <div class="index bg-slate-800">
    <div class="content">
      <canvas class="h-540 w-750" id="effect2"></canvas>
      <canvas class="h-540 w-750" id="effect3"></canvas>
    </div>
  </div>
</template>
