<script setup lang="ts">
import gsap from 'gsap'
import { onMounted } from 'vue'

/*  */
onMounted(() => {
  gsap.context(() => {
    gsap.timeline({ onComplete: () => {} }).delay(0.3)
  }, '.lottery')
})
</script>

<template>
  <section class="lottery">
    <main class="content"></main>
  </section>
</template>
