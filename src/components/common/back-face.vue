<script setup lang="ts">
import { useTemplateRef } from 'vue'

const { flip } = defineProps<{ flip?: 'front' | 'back' }>()

const flipRef = useTemplateRef('flipRef')

watchPostEffect(() => {
  if (flip === 'front') {
    gsap.to(flipRef.value!, { rotateY: 0, ease: 'power2', duration: 0.5 })
  } else if (flip === 'back') {
    gsap.to(flipRef.value!, { rotateY: 180, ease: 'power2', duration: 0.5 })
  }
})
</script>

<template>
  <div class="perspective-[1200]">
    <section ref="flipRef" class="relative h-full w-full transform-3d">
      <div
        :class="flip === 'front' ? 'pointer-events-auto' : 'pointer-events-none'"
        class="absolute left-0 top-0 h-full w-full backface-hidden"
      >
        <slot></slot>
      </div>
      <div
        :class="flip === 'back' ? 'pointer-events-auto' : 'pointer-events-none'"
        class="absolute left-0 top-0 h-full w-full backface-hidden rotate-y-[180]"
      >
        <slot name="back"> </slot>
      </div>
    </section>
  </div>
</template>
