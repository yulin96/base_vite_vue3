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
    <main class="content">
      <img class="w-100" src="../assets/imgs/back.svg" />
      <img class="w-100" src="../assets/imgs/index.png" />
      <img class="w-100" src="../assets/imgs/i2.jpg" />
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
