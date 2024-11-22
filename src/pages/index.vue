<script setup lang="ts">
/*  */
onMounted(() => {
  gsap.context(() => {
    gsap.timeline({ onComplete: () => {} }).delay(0.5)
  }, '.index')
})
</script>

<template>
  <section class="index">
    <main class="content rounded-120 w-300 rounded-2xl border-1 pt-120">
      <div class="m-auto size-200 rounded-4xl bg-blue-500"></div>
      <div class="m-auto mt-200 size-200 rounded-4xl bg-linear-50 from-blue-600 to-red-400"></div>
      <div class="m-auto w-300 border">
        <textarea class="field-sizing-content h-full w-full resize-none"></textarea>
      </div>
      <div class="font-stretch-expanded">这是一段可爱的文字</div>
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
