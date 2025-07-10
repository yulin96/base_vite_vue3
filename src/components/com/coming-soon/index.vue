<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')

const showPopup = ref(true)

const handleClose = () => {
  showPopup.value = false
}

defineExpose({
  show: () => {
    showPopup.value = true
  },
  setText: (newText: string) => {
    text.value = newText
  },
})
</script>

<template>
  <van-popup v-model:show="showPopup" :transition-appear="true" :close-on-click-overlay="false" transition="popup">
    <div class="back-full rounded-30 flex h-520 w-520 flex-col items-center bg-white pt-40 shadow-2xl">
      <img class="h-260" src="./icon.png" alt="" />
      <div class="text-32 tracking-2 mt-12 font-semibold">{{ text || '敬请期待...' }}</div>
      <div
        btn
        class="center tracking-2 mt-36 h-80 w-330 cursor-pointer rounded-full bg-linear-180 from-[#000] to-[#000] indent-2 text-white"
        @click="handleClose"
      >
        好的
      </div>
    </div>
  </van-popup>
</template>
