<script setup lang="ts">
const next = (e: any) => {
  showLottie(e)
}
</script>

<template>
  <div class="index">
    <div class="content" @click="next"></div>
  </div>
</template>
