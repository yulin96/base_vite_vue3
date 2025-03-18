<script setup lang="ts">
import gsap from 'gsap'
import { v4 } from 'uuid'
import { onMounted, ref } from 'vue'

defineProps<{ code: string }>()

const uuid = v4()

const isBig = ref(false)

const target: [number, number, number] = [4, 120, 0]
const toggleCode = () => {
  gsap.to(`#code-${uuid}`, {
    scale: isBig.value ? 1 : target[0],
    y: isBig.value ? 0 : target[1],
    x: isBig.value ? 0 : target[2],
    duration: 0.3,
    ease: 'back.out(1.7)',
  })
  isBig.value = !isBig.value
}

defineExpose({ toggleCode })

onMounted(() => {
  const bounding = document.querySelector(`#code-${uuid}`)?.getBoundingClientRect()
  const app = document.querySelector('#app')
  if (bounding && app) {
    const { width, height, top, left } = bounding
    target[0] = +((app.clientWidth - 50) / width).toFixed(2)
    target[1] = +(innerHeight / 2 - (top + height / 2) - 50).toFixed(2)
    target[2] = +(innerWidth / 2 - (left + width / 2)).toFixed(2)
  }
})
</script>

<template>
  <div :id="`code-${uuid}`" class="relative z-[20]" v-bind="$attrs" @click="toggleCode">
    <img class="h-full w-full" :src="code" />
  </div>
  <van-overlay :show="isBig" class="z-[10]" @click="toggleCode"></van-overlay>
</template>
