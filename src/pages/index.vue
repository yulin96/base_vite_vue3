<script setup lang="ts">
import { useState } from '@/hooks/useState'
import gsap from '@/tools/pip/gsap'
import { onMounted } from 'vue'

const [loaded, setLoaded] = useState(false)

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
