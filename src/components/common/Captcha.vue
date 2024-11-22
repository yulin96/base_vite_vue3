<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import { generateCaptcha } from '~/tools/generateCaptcha'

const { captchaLength = 5, padding = 10 } = defineProps<{
  captchaLength?: number
  padding?: number
}>()

const captchaRef = useTemplateRef('captchaRef')

const captchaString = ref('')

const checkCaptcha = (input: string) => {
  return input.toLowerCase() === captchaString.value.toLowerCase()
}

const refreshCaptcha = () => {
  const captcha = generateCaptcha(captchaRef.value, captchaLength, padding)
  if (!captcha) return console.error('captchaRef is not a valid element')
  captchaString.value = captcha
}

onMounted(() => {
  if (captchaRef.value) {
    refreshCaptcha()
  }
})

defineExpose({
  checkCaptcha,
  refreshCaptcha,
})
</script>

<template>
  <div ref="captchaRef"></div>
</template>
