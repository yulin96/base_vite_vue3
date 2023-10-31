<script setup lang="ts">
definePage({ meta: { gsapName: 'pages_index', index: 10 } })

onMounted(() => {
  window[gsapAll]['pages_index'] = gsap.context(() => {}, '.pages_index')
})
</script>

<template>
  <div class="pages_index">
    <div class="content"></div>
  </div>
</template>
