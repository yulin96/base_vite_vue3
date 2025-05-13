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

const test = (e: MouseEvent) => {
  gsap
    .timeline({ repeat: -1, repeatDelay: 1 })
    .to('.box > div', {
      scale: 0.6,
      opacity: 0.5,
      duration: 1,
      borderRadius: 60,
      stagger: { each: 0.05, from: 'center', grid: 'auto' },
      ease: 'elastic.out(1, 0.6)',
    })
    .to(
      '.box > div',
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        borderRadius: 0,
        stagger: { each: 0.05, from: 'center', grid: 'auto' },
        ease: 'elastic.in(1, 0.6)',
      },
      '>.5',
    )
}
</script>

<template>
  <section class="index group" :aria-expanded="loaded">
    <main class="center box content flex-wrap content-center" @click="test">
      <div v-for="id in 40" :key="id" class="size-150 bg-blue-600"></div>
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
