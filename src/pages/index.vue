<script setup lang="ts">
import { onMounted } from 'vue'

/*  */
onMounted(() => {
  window.h5sdk.ready(() => {
    // ready 方法不需要每次都调用。
    window.tt.requestAuthCode({
      appId: 'cli_a7f5cf1154b51013',
      success: (info) => {
        console.log('code', info.code)
      },
      fail: (error) => {
        console.log(error)
      },
    })
  })
})
</script>

<template>
  <section class="index">
    <main class="content"></main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
