<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue-sonner'

const { maxLength = 4 } = defineProps<{ maxLength?: number }>()
const emits = defineEmits<{
  next: [type: 'password' | 'stamp', content: string]
}>()

const passwordKeyboardIns = ref({
  show: false,
  password: '',
  open() {
    this.show = true
  },
  next() {
    if (!this.password) return toast.warning('请输入密码')
    if (this.password.length < maxLength) return toast.warning('请输入完整的密码')
    emits('next', 'password', this.password)
    this.show = false
  },
})

const sealTouches = new Set<{ x: number; y: number }>()
const touchstart = (e: TouchEvent) => {
  e.preventDefault()
  for (const touch of e.changedTouches) {
    sealTouches.add({ x: touch.clientX, y: touch.clientY })
  }

  if (sealTouches.size >= 5) {
    emits('next', 'stamp', JSON.stringify([...sealTouches].slice(0, 5)))
    sealTouches.clear()
  }
}

const touchend = (e: TouchEvent) => {
  e.preventDefault()
  sealTouches.clear()
}
</script>

<template>
  <div class="absolute inset-0 z-[20]">
    <div class="absolute inset-0 z-[10]" @touchstart="touchstart" @touchend="touchend"></div>
    <div class="absolute top-0 left-0 z-[20] size-[120px]" @click.stop="passwordKeyboardIns.open()"></div>

    <Teleport to="body">
      <ComKeyboard
        v-model:password="passwordKeyboardIns.password"
        v-model="passwordKeyboardIns.show"
        :max-length="maxLength"
        @next="passwordKeyboardIns.next()"
      ></ComKeyboard>
    </Teleport>
  </div>
</template>
