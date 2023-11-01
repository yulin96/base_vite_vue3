<script setup lang="ts">
definePage({ meta: { gsapName: 'views_index', index: 10 } })

onMounted(() => {
  window[gsapAll]['views_index'] = gsap.context(() => {}, '.views_index')
})
</script>

<template>
  <div class="views_index">
    <div class="content"></div>
  </div>
</template>
