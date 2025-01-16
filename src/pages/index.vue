<script setup lang="ts">
import axios, { toFormData } from 'axios'
import { MD5 } from 'crypto-js'
import gsap from 'gsap'
import { onMounted, ref } from 'vue'
import { toast } from 'vue-sonner'

const userInput = ref({
  uuid: '',
  score: '',
})

const next = () => {
  if (!userInput.value.uuid) return toast.warning('请输入工号')
  if (!userInput.value.score) return toast.warning('请输入分数')

  const _data = (userInput.value.uuid + userInput.value.score).split('').sort().join('-')
  const _add = _data.split('-').reduce((a, b) => {
    if (isNaN(Number(b))) return a
    return a + Number(b)
  }, 0)

  const token = MD5(_data + _add.toString()).toString()
  axios
    .post(
      'https://work.yulin.life/',
      toFormData({
        uuid: userInput.value.uuid,
        score: userInput.value.score,
        token,
      }),
    )
    .then((res: any) => {
      if (res.data.code == 200) {
        toast.success('提交成功')
      } else if (res.data.code == 301) {
        toast.error('token 无效')
      } else {
        toast.error('提交失败')
      }
    })
}

/*  */
onMounted(() => {
  gsap.context(() => {
    gsap.timeline({ onComplete: () => {} }).delay(0.5)
  }, '.index')
})
</script>

<template>
  <section class="index">
    <main class="content flex flex-col items-center space-y-30 pt-200">
      <div class="flex h-50 w-500 items-center">
        <div class="center h-full w-120">工号：</div>
        <div class="h-full flex-1 border">
          <input
            v-model.trim="userInput.uuid"
            class="h-full w-full px-12"
            type="tel"
            autocomplete="off"
          />
        </div>
      </div>
      <div class="flex h-50 w-500 items-center">
        <div class="center h-full w-120">分数：</div>
        <div class="h-full flex-1 border">
          <input
            v-model.trim="userInput.score"
            class="h-full w-full px-12"
            type="tel"
            autocomplete="off"
          />
        </div>
      </div>
      <div class="center h-50 w-500 border" @click="next">提交</div>
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
