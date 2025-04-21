<script setup lang="ts">
import { useState } from '@/hooks/useState'
import { gsap } from '@/tools/pip/gsap'
import html2canvas from 'html2canvas'
import { onMounted, ref } from 'vue'

const url = ref(
  'https://oss.eventnet.cn/H5/zz/auto2/alipay2504_20250411/bus/assets/bg-Dq0uvIEL.jpg',
)
const posterURL = ref('')

const test = () => {
  const renderArea = document.querySelector('[html2canvas]') as HTMLDivElement
  if (!renderArea) return console.error('未找到html2canvas节点')
  html2canvas(renderArea, {
    useCORS: true,
    width: renderArea.offsetWidth,
    height: renderArea.offsetHeight,
    backgroundColor: '#fff',
    ignoreElements: (el) => el.classList.contains('html2-hide'),
  }).then((canvas) => {
    const url = canvas.toDataURL('image/jpeg', 0.8)
    posterURL.value = url
  })
}

const [loaded, setLoaded] = useState(false)

onMounted(() => {
  gsap.context(() => {
    gsap.timeline({ delay: 0.5 }).then(() => setLoaded(true))
  }, '.index')
})
</script>

<template>
  <section class="index group" :aria-expanded="loaded">
    <main class="content center flex-col">
      <div html2canvas class="h-300 w-650 border">
        <ComImageScale :url="url"></ComImageScale>
      </div>
      <div class="center mt-60 h-120 w-300 border" @click="test">生成</div>
      <div v-if="posterURL" class="mt-50 w-500">
        <img :src="posterURL" alt="Poster Preview" />
      </div>
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
