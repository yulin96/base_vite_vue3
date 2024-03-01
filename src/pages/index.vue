<script setup lang="ts">
const linkTo = inject('linkTo') as LinkTo

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
