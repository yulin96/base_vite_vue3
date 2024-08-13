<script setup lang="ts">
import html2canvas from '~/tools/html2canvas'

const test = () => {
  const html2 = document.querySelector('[html2canvas]') as HTMLDivElement
  html2canvas(html2, {
    useCORS: true,
    width: html2.offsetWidth,
    height: html2.offsetHeight,
    backgroundColor: 'none',
    ignoreElements: (el) => el.classList.contains('html2-hide'),
  }).then((canvas) => {
    const url = canvas.toDataURL('image/jpeg')
    console.log(url)
  })
}
/*  */
onMounted(() => {
  gsap.context(() => {
    gsap.timeline({ onComplete: () => {} }).delay(0.5)
  }, '.index')
})
</script>

<template>
  <section class="index" html2canvas>
    <main class="content">
      123123
      <div class="h-300 w-600">
        <common-image-scale
          :url="'https://oss.eventnet.cn/H5/zz/auto/benz2407_20240704/assets/bg-DIEWG6gQ.jpg'"
        ></common-image-scale>
      </div>

      <div @click="test">测试</div>
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
