<script setup lang="ts">
import { useState } from '@/hooks/useState'
import gsap from '@/tools/pip/gsap'
import { onMounted } from 'vue'

const [loaded, setLoaded] = useState(false)

onMounted(() => {
  gsap.context(() => {
    gsap.timeline({ delay: 0.3 }).then(() => setLoaded(true))
  }, '.p2')
})
</script>

<template>
  <section class="p2 group" :aria-expanded="loaded">
    <main class="content">p2</main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
