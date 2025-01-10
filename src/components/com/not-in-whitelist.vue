<script setup lang="ts">
const show = defineModel<boolean>({ required: true })
</script>

<template>
  <van-popup v-model:show="show" transition="popup">
    <div class="h-800 w-600 rounded-12 bg-white"></div>
  </van-popup>
</template>
