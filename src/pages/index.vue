<script setup lang="ts">
const linkTo = inject('linkTo') as ILinkTo
const { get: get_init } = useLock()

const testReq = () => {
  get_init('http://localhost:3000').then((res) => {
    console.log(res)
  })
}

const testReq2 = () => {
  linkTo('home')
}
</script>

<template>
  <div class="index">
    <div class="content">
      <div @click="testReq" class="btn">点击</div>
      <div @click="testReq2" class="btn">点击2</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.index {
  .content {
    background: antiquewhite;
  }
}
</style>
