<script setup lang="ts">
import { animate } from 'motion'
import { v4 } from 'uuid'
import { ref } from 'vue'

defineProps<{ code: string }>()

const uuid = v4()

const isBig = ref(false)
const toggleCode = (dispatch?: boolean) => {
  animate(
    `#code-${uuid}`,
    { scale: dispatch ? 1 : isBig.value ? 1 : 2.2 },
    { type: 'tween', ease: 'backOut' },
  )

  isBig.value = dispatch || !isBig.value
}
</script>

<template>
  <div :id="`code-${uuid}`" class="relative z-[20]" v-bind="$attrs" @click="toggleCode()">
    <img class="h-full w-full" :src="code" />
  </div>
  <van-overlay :show="isBig" class="z-[10]" @click="toggleCode(false)"></van-overlay>
</template>
