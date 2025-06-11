<script setup lang="ts">
import { ref } from 'vue'
import bg from './bg.png'

const props = defineProps<{
  text?: string
  onClose?: () => void
}>()

const handleClose = () => {
  showPopup.value = false
}

const showPopup = ref(true)

defineExpose({
  show: () => {
    showPopup.value = true
  },
})
</script>

<template>
  <VanPopup
    v-model:show="showPopup"
    :transition-appear="true"
    :close-on-click-overlay="false"
    transition="popup"
    @closed="props?.onClose?.()"
  >
    <div
      class="back-full flex h-420 w-520 flex-col items-center rounded-lg pt-40 shadow-2xl"
      :style="{ backgroundImage: `url(${bg})` }"
    >
      <img class="h-155" src="./icon.png" alt="" />
      <div class="text-32 tracking-2 mt-20 font-semibold">{{ text || '报名成功' }}</div>
      <div
        btn
        class="center tracking-2 mt-36 h-80 w-330 cursor-pointer rounded-full bg-linear-180 from-[#FE4600] to-[#FE4600] indent-2 text-white"
        @click="handleClose"
      >
        好的
      </div>
    </div>
  </VanPopup>
</template>
