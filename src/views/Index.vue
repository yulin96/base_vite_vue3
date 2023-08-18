<script setup lang="ts">
const linkTo = inject('linkTo') as ILinkTo

const name = useDebouncedRef(123)
name.value = 123
</script>

<template>
  <div class="Index">
    <div class="content">123</div>
  </div>
</template>

<style scoped lang="scss">
.Index {
  .content {
    width: 100px;
    height: 200px;
  }
}
</style>
