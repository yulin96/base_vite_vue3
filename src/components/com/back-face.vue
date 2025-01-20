<script setup lang="ts">
import { animate } from 'motion'
import { useTemplateRef, watchPostEffect } from 'vue'

const { flip = false } = defineProps<{ flip?: boolean }>()

const flipRef = useTemplateRef('flipRef')

watchPostEffect(() => {
  animate(flipRef.value!, { rotateY: flip ? 180 : 0 }, { type: 'tween', ease: 'easeOut' })
})
</script>

<template>
  <div class="perspective-[1200]">
    <section ref="flipRef" class="relative h-full w-full transform-3d">
      <div
        :class="!flip ? 'pointer-events-auto' : 'pointer-events-none'"
        class="absolute left-0 top-0 h-full w-full backface-hidden"
      >
        <slot></slot>
      </div>
      <div
        :class="flip ? 'pointer-events-auto' : 'pointer-events-none'"
        class="absolute left-0 top-0 h-full w-full backface-hidden rotate-y-[180]"
      >
        <slot name="back"> </slot>
      </div>
    </section>
  </div>
</template>
