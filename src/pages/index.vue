<script setup lang="ts">
import { useStatus } from '@/hooks/useStatus'
import { getUserImage } from '@/utils/user/media'
import gsap from 'gsap'
import html2canvas from 'html2canvas'
import { onMounted, ref } from 'vue'

const posterURL = ref('')
const upload = () => {
  getUserImage().then((file) => {
    posterURL.value = URL.createObjectURL(file)
  })
}

const createURL = ref('')
const create = () => {
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
    console.log(url)
    createURL.value = url
  })
}

const [loaded, setLoaded] = useStatus(false)

onMounted(() => {
  gsap.context(() => {
    gsap.timeline({ delay: 0.5 }).then(() => setLoaded(true))
  }, '.index')
})
</script>

<template>
  <section class="index group" :aria-expanded="loaded">
    <main class="content flex flex-col items-center pt-90">
      <div class="mb-20 border p-12" @click="upload">上传图片</div>
      <div html2canvas class="relative h-938 w-527 border">
        <div class="absolute inset-0">
          <ComImageScale :url="posterURL"></ComImageScale>
          <img class="pointer-events-none absolute inset-0 z-10 h-full w-full" src="../assets/imgs/poster.png" alt="" />
        </div>
      </div>
      <div class="my-20 border p-12" @click="create">生成</div>

      <img v-if="createURL" :src="createURL" class="w-527" alt="" />
      <div class="mt-60 h-938 w-527 border">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nulla veritatis rerum autem saepe quae a laborum,
        dolore non officiis? Laboriosam, vero fuga soluta voluptate odio itaque ipsum esse labore?
      </div>
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
