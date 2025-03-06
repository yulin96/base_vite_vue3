<script setup lang="ts">
import { animate } from 'motion'
import { v4 } from 'uuid'
import { onMounted, ref } from 'vue'

defineProps<{ code: string }>()

const uuid = v4()

const isBig = ref(false)

const target: [number, number, number] = [4, 120, 0]
const toggleCode = () => {
  animate(
    `#code-${uuid}`,
    {
      scale: isBig.value ? 1 : target[0],
      y: isBig.value ? 0 : target[1],
      x: isBig.value ? 0 : target[2],
    },
    { type: 'tween', ease: 'backOut' },
  )

  isBig.value = !isBig.value
}

defineExpose({ toggleCode })

onMounted(() => {
  const bounding = document.querySelector(`#code-${uuid}`)?.getBoundingClientRect()
  const app = document.querySelector('#app')
  if (bounding && app) {
    const { width, height, top, left } = bounding

    target[0] = Math.floor((app.clientWidth - 50) / width)
    target[1] = Math.floor(
      app.clientHeight / 2 - (top + height / 2) + (top < app.clientHeight / 2 ? -20 : 20),
    )
    target[2] = Math.floor(innerWidth / 2 - (left + width / 2))
  }
})
</script>

<template>
  <div :id="`code-${uuid}`" class="relative z-[20]" v-bind="$attrs" @click="toggleCode">
    <img class="h-full w-full" :src="code" />
  </div>
  <van-overlay :show="isBig" class="z-[10]" @click="toggleCode"></van-overlay>
</template>
