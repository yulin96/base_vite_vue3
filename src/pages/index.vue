<script setup lang="ts">
console.log('test 123123')
</script>

<template>
  <div class="h-[1080px] w-[1920px]">
    <div v-for="x in 6" :key="x" :data-x="x" class="flex h-1/6 w-full bg-red-200/20">
      <div v-for="y in 8" :key="y" :data-y="y" class="h-full w-[12.5%] bg-sky-600/60"></div>
    </div>
  </div>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
