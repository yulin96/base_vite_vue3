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
  <section class="index">
    <main
      html2canvas
      class="content back-top flex flex-col items-center bg-[url(https://oss.eventnet.cn/H5/zz/auto/huawei2408_20240819/assets/1-B5XLqXhj.jpg)]"
    >
      <div class="bg-white">
        123123
        <div @click="test">测试</div>
      </div>
      <img class="h-92" src="https://oss.eventnet.cn/H5/zz/auto/huawei2408_20240819/assets/1-Byj5u4qr.png" />

      <img class="mt-90 h-111" src="https://oss.eventnet.cn/H5/zz/auto/huawei2408_20240819/assets/2-CuVy1GYx.png" />
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
