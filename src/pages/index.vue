<script setup lang="ts">
import gsap from 'gsap'
import html2canvas from 'html2canvas'
import { onMounted, ref } from 'vue'

const title = ref('春风化雨')
const left = ref('春风化雨山山翠')
const right = ref('政策归心处处春')

const imgURL = ref('')

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
    imgURL.value = url
  })
}
/*  */
onMounted(() => {
  gsap.context(() => {
    gsap.timeline({ onComplete: () => {} }).delay(0.5)
  }, '.index')

  setTimeout(() => {
    test()
  }, 2000)
})
</script>

<template>
  <section class="index" @click="test">
    <main class="content"></main>
    <div html2canvas class="fixed left-0 top-0 h-[1560px] w-750">
      <img class="absolute left-0 top-0 h-full w-full" src="../assets/imgs/x2.jpg" />
      <div
        class="absolute left-[180px] top-[200px] flex h-100 w-[400px] items-center justify-center"
      >
        <div v-for="item in title" :key="item" class="text-52 tracking-[4px] text-[#f0e424]">
          {{ item }}
        </div>
      </div>
      <div
        class="absolute left-[40px] top-[610px] flex h-[620px] w-[100px] flex-col items-center justify-center"
      >
        <div v-for="item in left" :key="item" class="text-52 leading-[1.3] text-[#f0e424]">
          {{ item }}
        </div>
      </div>
      <div
        class="absolute right-[40px] top-[610px] flex h-[620px] w-[100px] flex-col items-center justify-center"
      >
        <div v-for="item in right" :key="item" class="text-52 leading-[1.3] text-[#f0e424]">
          {{ item }}
        </div>
      </div>
    </div>
    <div v-if="imgURL" class="center fixed left-0 top-0 z-20 h-[1560px] w-750">
      <img class="w-500 border" :src="imgURL" />
    </div>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
