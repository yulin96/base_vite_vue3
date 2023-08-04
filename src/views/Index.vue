<script setup lang="ts">
const { get: get_init } = useLock()

const testReq = () => {
  get_init('http://localhost:3000').then((res) => {
    console.log(res)
  })
}
</script>

<template>
  <div class="Index">
    <div class="content">
      <div @click="testReq" class="btn">点击</div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
