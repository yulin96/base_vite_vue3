<script setup lang="ts">
const { maxLength = 4 } = defineProps<{ maxLength?: number }>()

const emits = defineEmits<{ next: [string] }>()

const showKeyboard = defineModel<boolean>({ required: true })
const password = defineModel<string>('password', { required: true })

const onPopupClose = () => {
  password.value = ''
}

const onKeyboardClose = () => {
  emits('next', password.value)
}
</script>

<template>
  <VanPopup v-model:show="showKeyboard" position="bottom" class="bg-[#f2f3f5]" @closed="onPopupClose">
    <VanPasswordInput
      class="[&_li]:rounded-8 mx-[12px] pt-[50px] pb-[520px]"
      :value="password"
      :length="maxLength"
      :gutter="6"
      :focused="true"
    />
    <VanNumberKeyboard
      v-model="password"
      :maxlength="maxLength"
      :show="true"
      theme="custom"
      close-button-text="完成"
      extra-key="."
      :hide-on-click-outside="false"
      @close="onKeyboardClose"
    />
  </VanPopup>
</template>
