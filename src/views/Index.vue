<script setup lang="ts">
const linkTo = inject('linkTo') as ILinkTo
</script>

<template>
  <div class="index">
    <div class="content">
      <div class="sss">123</div>
    </div>
  </div>
</template>

<style scoped>
.index {
  .content {
    .sss {
      display: flex;
      align-items: center;
      background: red;
      transform: translateX(10px);

      &:hover {
        background: blue;
      }
    }
  }
}
</style>
