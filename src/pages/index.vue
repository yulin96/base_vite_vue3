<script setup lang="ts">
import gsap from 'gsap'
import { onMounted } from 'vue'

/*  */
onMounted(() => {
  gsap.context(() => {
    gsap.timeline({ onComplete: () => {} }).delay(0.5)
  }, '.index')

  if (window.tt.requestAccess) {
    window.tt.requestAccess({
      // 网页应用 App ID
      appID: 'cli_a7f5cf1154b51013',
      scopeList: [],
      success: (res) => {
        // 用户授权后返回预授权码
        const { code } = res
        console.log(code)
      },
      fail: (error) => {
        // 需要额外根据errno判断是否为 客户端不支持requestAccess导致的失败
        const { errno, errString } = error
        if (errno === 103) {
          // 客户端版本过低，不支持requestAccess，需要改为调用requestAuthCode
          callRequestAuthCode()
        } else {
          // 用户拒绝授权或者授权失败
        }
      },
    })
  } else {
    // JSSDK版本过低，不支持requestAccess，需要改为调用requestAuthCode
    callRequestAuthCode()
  }
  function callRequestAuthCode() {
    console.log('callRequestAuthCode')

    window.tt.requestAuthCode({
      // 网页应用 App ID
      appId: 'cli_a7f5cf1154b51013',
      success: (res) => {
        // 用户免登录后返回预授权码
        const { code } = res
        console.log(code)
      },
      fail: (error) => {
        // 免登失败，返回相应的errno和errString
        const { errno, errString } = error
        console.log(errno, errString)
      },
    })
  }
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
