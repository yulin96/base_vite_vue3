<script setup lang="ts">
/*  */
onMounted(() => {
  window[gsapAll]['index'] = gsap.context(() => {}, '.index')
})
</script>

<template>
  <div class="index">
    <div class="content"></div>
  </div>
</template>
