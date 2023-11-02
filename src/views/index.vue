<script setup lang="ts">
definePage({ meta: { gsapName: 'index', index: 10 } })

onMounted(() => {
  window[gsapAll]['index'] = gsap.context(() => {}, '.index')
})
</script>

<template>
  <div class="index">
    <div class="content"></div>
  </div>
</template>
