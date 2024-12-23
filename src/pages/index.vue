<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import gsap from 'gsap'
import { onMounted } from 'vue'

const [show, setShow] = useToggle(true)
/*  */

const [isDone, setIsDone] = useToggle(false)
onMounted(() => {
  setIsDone(true)
  gsap.context(() => {
    gsap.timeline({ onComplete: () => {} }).delay(0.5)
  }, '.index')
})
</script>

<template>
  <section class="index">
    <main
      class="content center back-bottom relative flex flex-col items-center bg-[url(~/assets/imgs/bg.jpg)]"
      @click="setShow()"
    >
      <!-- <img
        v-if="show"
        class="absolute bottom-[230px] w-655 animate-pulse"
        src="../assets/imgs/2.png"
      /> -->
      <!-- <div class="relative w-600">
        <img class="w-full" src="../assets/imgs/1.png" />
        <img class="absolute top-0 z-10 block w-full animate-pulse" src="../assets/imgs/2.png" />
      </div> -->
      <img
        v-if="show"
        class="absolute bottom-[232px] left-[46px] w-[150px]"
        :class="[isDone ? 'animate-pulse' : '']"
        src="../assets/imgs/l.png"
      />
      <img
        v-if="show"
        class="absolute bottom-[230px] left-[560px] w-[140px]"
        :class="[isDone ? 'animate-pulse' : '']"
        src="../assets/imgs/r.png"
      />
      <img class="absolute bottom-10 w-752" src="../assets/imgs/4.png" />
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
