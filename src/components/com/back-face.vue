<script setup lang="ts">
import gsap from 'gsap'
import { useTemplateRef, watchPostEffect } from 'vue'

const { flip = false } = defineProps<{ flip?: boolean }>()

const flipRef = useTemplateRef('flipRef')

watchPostEffect(() => {
  gsap.to(flipRef.value, { rotateY: flip ? 180 : 0, duration: 0.3, ease: 'power1' })
})

/**
  <com-back-face :flip="showBack" class="h-500 w-300">
    <template #default>
      <div class="h-full w-full rounded-12 bg-sky-200"></div>
    </template>
    <template #back>
      <div class="h-full w-full rounded-12 bg-cyan-600"></div>
    </template>
  </com-back-face>
 */
</script>

<template>
  <div class="perspective-midrange">
    <section ref="flipRef" class="relative h-full w-full transform-3d">
      <div
        :class="!flip ? 'pointer-events-auto' : 'pointer-events-none'"
        class="absolute top-0 left-0 h-full w-full backface-hidden"
      >
        <slot></slot>
      </div>
      <div
        :class="flip ? 'pointer-events-auto' : 'pointer-events-none'"
        class="absolute top-0 left-0 h-full w-full rotate-y-[180] backface-hidden"
      >
        <slot name="back"> </slot>
      </div>
    </section>
  </div>
</template>
