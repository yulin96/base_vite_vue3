<script setup lang="ts">
definePage({ meta: { index: 10 } })
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
