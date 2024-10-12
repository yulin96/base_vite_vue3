<script setup lang="ts">
/*  */
onMounted(() => {
  gsap.context(() => {
    gsap.timeline({ onComplete: () => {} }).delay(0.5)
  }, '.index')
})
</script>

<template>
  <section class="index">
    <main class="content">Index1111</main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
