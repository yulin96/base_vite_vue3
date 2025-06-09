<script setup lang="ts">
import { useStatus } from '@/hooks/useStatus'
import gsap from 'gsap'
import { onMounted } from 'vue'

const [loaded, setLoaded] = useStatus(false)

onMounted(() => {
  gsap.context(() => {
    gsap.timeline({ delay: 0.5 }).then(() => setLoaded(true))
  }, '.index')
})
</script>

<template>
  <section class="index group" :aria-expanded="loaded">
    <main class="content"></main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
