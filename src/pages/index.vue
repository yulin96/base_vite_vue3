<script setup lang="ts">
import { showToast } from '~/tools/userExperience'

showToast({ message: '你好世界', duration: 0 })
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
      <div class="w-750 border text-30">你好世界</div>
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
