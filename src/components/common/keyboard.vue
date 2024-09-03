<script setup lang="ts">
withDefaults(defineProps<{ maxLength?: number }>(), { maxLength: 4 })
const emits = defineEmits<{ close: [string] }>()

const showKeyboard = defineModel<boolean>({ required: true })
const password = ref('')

const onPopupClose = () => {
  password.value = ''
}

const onKeyboardClose = () => {
  emits('close', password.value)
}
</script>

<template>
  <van-popup v-model:show="showKeyboard" position="bottom" class="bg-[#f2f3f5]" @closed="onPopupClose">
    <van-password-input
      class="mx-12 pb-[520px] pt-50 [&_li]:rounded-8"
      :value="password"
      :length="maxLength"
      :gutter="6"
      :focused="true"
    />
    <van-number-keyboard
      v-model="password"
      :maxlength="maxLength"
      :show="true"
      theme="custom"
      close-button-text="完成"
      extra-key="."
      :hide-on-click-outside="false"
      @close="onKeyboardClose"
    />
  </van-popup>
</template>
