<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import axios from 'axios'
import { SHA256 } from 'crypto-js'
import gsap from 'gsap'
import { onMounted, ref } from 'vue'

const showLogin = ref(false)

const login = () => {
  location.href =
    'https://sdcsso.lenovo.com/webauthn/gateway?webauthn_action=uilogin&webauthn_realm=fy.event1.cn&webauthn_callback=https://fy.event1.cn/test/callback/'

  // showLogin.value = true
}

const reg = (url: string) => {
  const data = {
    username: 'viacde11@126.com',
    webauthn_lang: 'zh_CN',
    webauthn_source: 'https://fy.event1.cn',
    webauthn_callback: 'https://fy.event1.cn/test/callback/',
    webauthn_realm: 'fy.event1.cn',
    firstName: 'viacde',
    lastName: 'sun',
  }

  axios
    .post(
      `https://${url}/webauthn/accountRegister`,
      {
        ...data,
        signature: SHA256(data.firstName.toLowerCase() + data.webauthn_realm).toString(),
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
      <div class="center h-90 w-full border" @click="reg('cn-test.lenovomm.cn')">
        注册 cn-test.lenovomm.cn
      </div>
      <hr class="w-full" />
      <div class="center h-90 w-full border" @click="reg('sdcsso.lenovo.com')">
        注册 sdcsso.lenovo.com
      </div>
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
