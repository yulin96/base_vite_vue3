<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import axios from 'axios'
import gsap from 'gsap'
import { onMounted } from 'vue'

const login = () => {
  location.href =
    'https://cn-test.lenovomm.cn/webauthn/gateway?webauthn_action=uilogin&webauthn_realm=fy.event1.cn&webauthn_callback=https://fy.event1.cn/test/callback/'
}

const reg = () => {
  axios
    .post(
      'https://cn-test.lenovomm.cn/webauthn/accountRegister',
      {
        username: 'viacde11@126.com',
        webauthn_lang: 'zh_CN',
        webauthn_source: 'fy.event1.cn',
        webauthn_realm: 'fy.event1.cn',
        firstName: 'viacde',
        lastName: 'sun',
        signature: '9470d9934530de72311470897d7e4e42206e31e129c8deb87554ef17eed5d0ef',
        webauthn_callback: 'https://fy.event1.cn',
        webauthn_state: 'https://fy.event1.cn',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}
const reg2 = () => {
  axios
    .post(
      'https://sdcsso.lenovo.com/webauthn/accountRegister',
      {
        username: 'viacde11@126.com',
        webauthn_lang: 'zh_CN',
        webauthn_source: 'fy.event1.cn',
        webauthn_realm: 'fy.event1.cn',
        firstName: 'viacde',
        lastName: 'sun',
        signature: '9470d9934530de72311470897d7e4e42206e31e129c8deb87554ef17eed5d0ef',
        webauthn_callback: 'https://fy.event1.cn',
        webauthn_state: 'https://fy.event1.cn',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

const [isLoaded, setIsLoaded] = useToggle(false)

onMounted(() => {
  gsap.context(() => {
    gsap.timeline({ delay: 0.5 }).then(() => setIsLoaded(true))
  }, '.index')
})
</script>

<template>
  <section class="index group" :aria-expanded="isLoaded">
    <main class="content flex flex-col items-center space-y-12 pt-50">
      <div class="center h-90 w-full border" @click="login">登录</div>
      <hr class="w-full" />
      <div class="center h-90 w-full border" @click="reg">注册 cn-test.lenovomm.cn</div>
      <hr class="w-full" />
      <div class="center h-90 w-full border" @click="reg2">注册 sdcsso.lenovo.com</div>
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
