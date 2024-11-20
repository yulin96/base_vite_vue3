<script setup lang="ts">
defineProps<{ code: string }>()

const isBig = ref(false)
const toggleCode = (dispatch?: boolean) => {
  gsap.to('[code]', {
    scale: dispatch ? 1 : isBig.value ? 1 : 2.2,
    duration: 0.3,
    ease: 'back',
  })
  isBig.value = dispatch || !isBig.value
}
</script>

<template>
  <div code @click="toggleCode()" class="relative z-20" v-bind="$attrs">
    <img class="h-full w-full" :src="code" />
  </div>
  <VanOverlay :show="isBig" @click="toggleCode(false)" class="z-10"></VanOverlay>
</template>
