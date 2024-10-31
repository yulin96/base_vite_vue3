<script setup lang="ts">
const { maxLength = 4 } = defineProps<{ maxLength?: number }>()

const emits = defineEmits<{ next: [string] }>()

const showKeyboard = defineModel<boolean>({ required: true })
const password = ref('')

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
      class="mx-[12px] pb-[520px] pt-[50px] [&_li]:rounded-8"
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
