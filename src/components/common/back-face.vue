<script setup lang="ts">
const props = defineProps<{ flip?: 'front' | 'back' }>()

const flipDom = ref()

watchPostEffect(() => {
  if (props.flip === 'front') {
    gsap.to(flipDom.value, { rotateY: 0, ease: 'power2', duration: 0.5 })
  } else if (props.flip === 'back') {
    gsap.to(flipDom.value, { rotateY: 180, ease: 'power2', duration: 0.5 })
  }
})
</script>

<template>
  <div class="perspective-[1200]">
    <section ref="flipDom" class="relative h-full w-full transform-3d">
      <div
        :class="props.flip === 'front' ? 'pointer-events-auto' : 'pointer-events-none'"
        class="absolute left-0 top-0 h-full w-full backface-hidden"
      >
        <slot></slot>
      </div>
      <div
        :class="props.flip === 'back' ? 'pointer-events-auto' : 'pointer-events-none'"
        class="absolute left-0 top-0 h-full w-full backface-hidden rotate-y-[180]"
      >
        <slot name="back"> </slot>
      </div>
    </section>
  </div>
</template>
