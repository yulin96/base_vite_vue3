<script setup lang="ts">
/*  */
onMounted(() => {
  gsap.context(() => {}, '.index')
})
</script>

<template>
  <div class="index">
    <div class="content"></div>
  </div>
</template>
