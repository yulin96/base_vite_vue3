<script setup lang="ts">
import { useStatus } from '@/hooks/useStatus'
import { gsap } from 'gsap'
import { onMounted } from 'vue'

const [loaded, setLoaded] = useStatus(false)

onMounted(() => {
  gsap.context(() => {
    gsap.timeline({ delay: 0.5 }).then(() => setLoaded(true))
  }, '.index')
})
</script>

<template>
  <section>
    <main v-bind="$attrs" class="index">
      <div class="content"></div>
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
