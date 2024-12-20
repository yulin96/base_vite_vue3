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
    <main class="content center bg-[#0a1e32]">
      <div class="relative w-600">
        <img class="w-full" src="../assets/imgs/1.png" />
        <img class="absolute top-0 z-10 block w-full animate-pulse" src="../assets/imgs/2.png" />
      </div>
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
