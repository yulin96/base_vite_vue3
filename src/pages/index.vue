<script setup lang="ts">
const itemRefs = ref<HTMLDivElement[]>([])

const test = () => {
  console.log(itemRefs.value[5])

  itemRefs.value[5]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
}
/*  */
onMounted(() => {
  gsap.context(() => {
    gsap.timeline({ onComplete: () => {} }).delay(0.5)
  }, '.index')
})
</script>

<template>
  <section class="index">
    <main class="content pt-200">
      <div class="flex h-100 w-full items-center space-x-20 overflow-x-auto">
        <div
          v-for="item in 20"
          :key="item"
          ref="itemRefs"
          class="flex-shrink-0 flex-grow-0 rounded-full border px-20 py-10"
        >
          {{ `第${item}个元素` }}
        </div>
      </div>

      <div class="center mt-200 h-100 w-full border" @click="test">测试</div>

      <div v-for="item in 20" :key="item" class="my-60">{{ item }}</div>
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
