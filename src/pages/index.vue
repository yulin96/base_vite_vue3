<script setup lang="ts">
import gsap from 'gsap'
import { onMounted } from 'vue'

/*  */
onMounted(() => {
  gsap.context(() => {
    gsap.timeline({ onComplete: () => {} }).delay(0.5)
  }, '.index')
})
</script>

<template>
  <section class="index">
    <main class="content"></main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
