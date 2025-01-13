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
    <main class="content flex flex-col items-center pt-[200px]">
      <div class="flex h-700 w-700 flex-wrap items-center justify-evenly bg-sky-200">
        <div lucky-id="0" class="center order-1 size-[200px] cursor-pointer bg-teal-200">0</div>
        <div lucky-id="1" class="center order-2 size-[200px] cursor-pointer bg-teal-200">1</div>
        <div lucky-id="2" class="center order-3 size-[200px] cursor-pointer bg-teal-200">2</div>
        <div lucky-id="3" class="center order-6 size-[200px] cursor-pointer bg-teal-200">3</div>
        <div lucky-id="4" class="center order-9 size-[200px] cursor-pointer bg-teal-200">4</div>
        <div lucky-id="5" class="center order-8 size-[200px] cursor-pointer bg-teal-200">5</div>
        <div lucky-id="6" class="center order-7 size-[200px] cursor-pointer bg-teal-200">6</div>
        <div lucky-id="7" class="center order-4 size-[200px] cursor-pointer bg-teal-200">7</div>
        <div game-btn btn class="center order-5 size-[200px] cursor-pointer bg-teal-200">
          开始抽奖
        </div>
      </div>
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
