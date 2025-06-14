<script setup lang="ts">
import { sleep } from '@/shared/common'
import { randomInt } from 'es-toolkit'
import { nextTick, onMounted, ref, useTemplateRef } from 'vue'

const props = defineProps<{
  texts: string[]
  speed: number | [number, number]
}>()

const lineRef = useTemplateRef('lineRef')
const lineWidth: number[] = []

const lines = ref<string[]>([])
const currentIndex = ref(0)

const writeText = async () => {
  const idx = currentIndex.value
  if (idx >= props.texts.length) return

  if (!lines.value[idx]) lines.value[idx] = ''

  const line = props.texts[idx]
  const shown = lines.value[idx].length
  if (shown < line.length) {
    lines.value[idx] += line[shown]
  } else if (idx < props.texts.length - 1) {
    currentIndex.value++
  } else if (idx == props.texts.length - 1) {
    return
  }

  const time = Array.isArray(props.speed) ? randomInt(props.speed[0], props.speed[1]) : props.speed

  await sleep(time)
  writeText()
}

onMounted(async () => {
  props.texts.forEach((item) => {
    const div = document.createElement('div')
    div.innerHTML = item
    div.style.position = 'absolute'
    div.style.whiteSpace = 'nowrap'
    div.style.visibility = 'hidden'
    lineRef.value!.appendChild(div)
    lineWidth.push(div.clientWidth)
    lineRef.value!.removeChild(div)
  })
  await nextTick()
  writeText()
})
</script>

<template>
  <div ref="lineRef" class="flex w-full flex-col items-center">
    <div v-for="(_, index) in texts" :key="index" :style="{ width: lineWidth[index] + 'px' }" class="whitespace-nowrap">
      {{ lines[index] }}
      <span v-show="currentIndex === index" class="animate-[caret-blink_0.8s_infinite] ease-out">_</span>
    </div>
  </div>
</template>
