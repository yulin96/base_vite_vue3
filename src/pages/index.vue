<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import gsap from 'gsap'
import { onMounted } from 'vue'

const [isLoaded, setIsLoaded] = useToggle(false)
onMounted(() => {
  gsap.context(() => {
    gsap.timeline({ delay: 0.5 }).then(() => setIsLoaded(true))
  }, '.index')
})
</script>

<template>
  <section class="index group" :aria-expanded="isLoaded">
    <main class="content"></main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
