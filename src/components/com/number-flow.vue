<script setup lang="ts">
import NumberFLow, { continuous } from '@number-flow/vue'
import { gsap } from 'gsap'
import { v4 } from 'uuid'
import { onMounted } from 'vue'

const props = defineProps<{ value: number; animate?: boolean }>()

const id = v4()
let dom: HTMLElement | null = null
let color = 'null'

const handleAnimationsStart = () => {
  if (dom && props.animate) gsap.to(dom, { color: '#f00' })
}

const handleAnimationsFinish = () => {
  if (dom && props.animate) gsap.to(dom, { color: color })
}

onMounted(() => {
  dom = document.getElementById(id)
  if (dom) color = getComputedStyle(dom).color
})
</script>

<template>
  <NumberFLow
    :id="id"
    :value="value"
    will-change
    locales="en"
    :format="{
      useGrouping: false,
    }"
    :trend="0"
    :plugins="[continuous]"
    @animationsstart="handleAnimationsStart"
    @animationsfinish="handleAnimationsFinish"
  ></NumberFLow>
</template>
