<script setup lang="ts">
defineProps<{ flip?: boolean; flipDomClass?: string }>()
</script>

<template>
  <div class="test perspective-[1200]">
    <section :class="flipDomClass" class="relative h-full w-full transform-3d">
      <div
        :class="flip ? 'rotate-y-[180]' : 'rotate-y-[0]'"
        class="absolute left-0 top-0 h-full w-full backface-hidden"
      >
        <slot></slot>
      </div>
      <div
        :class="flip ? 'rotate-y-[0]' : 'rotate-y-[180]'"
        class="absolute left-0 top-0 h-full w-full backface-hidden"
      >
        <slot name="back"> </slot>
      </div>
    </section>
  </div>
</template>
