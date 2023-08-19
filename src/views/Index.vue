<script setup lang="ts">
const linkTo = inject('linkTo') as ILinkTo
</script>

<template>
  <div class="Index">
    <div class="content" @click="showLoadingToast({ message: '123123', forbidClick: false })">123</div>
  </div>
</template>

<style scoped lang="scss">
.Index {
  .content {
    height: 6100px;
    background: url("https://oss.eventnet.cn/H5/CHENGHAO/LEGION818/images/bg02.jpg") top 400px center/100% auto no-repeat;
  }
}
</style>
