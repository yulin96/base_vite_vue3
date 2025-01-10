<script setup lang="ts">
import gsap from 'gsap'
import { onMounted, ref } from 'vue'

const show = ref(false)

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
      <div @click="show = !show">123123</div>
    </main>
    <com-not-in-whitelist v-model="show"></com-not-in-whitelist>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
