<script setup lang="ts">
/*  */
onMounted(() => {
  gsap.context(() => {
    gsap.timeline({ delay: 0.5, onComplete: () => {} })
  }, '.index')
})
</script>

<template>
  <div class="index">
    <div class="content"></div>
  </div>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
