<script setup lang="ts">
const linkTo = inject('linkTo') as ILinkTo
</script>

<template>
  <div class="home">
    <div class="content"></div>
    <VBack url="/"></VBack>
  </div>
</template>

<style lang="scss" scoped>
.home {
  .content {
    background: cadetblue;
  }
}
</style>
