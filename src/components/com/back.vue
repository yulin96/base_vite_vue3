<script setup lang="ts">
import type { RouteNamedMap } from 'vue-router/auto-routes'
import backIcon from '~/assets/imgs/back.svg'
import router from '~/router'
import { useStore } from '~/stores'

const { user } = useStore()

const props = defineProps<{ back?: keyof RouteNamedMap; icon?: string }>()

const onClick = () => {
  router.replace({ name: props.back || '/' })
}
</script>

<template>
  <VanFloatingBubble
    v-model:offset="user.backXY"
    axis="xy"
    class="size-[80px] rounded-none"
    magnetic="x"
    :gap="12"
    :teleport="null"
  >
    <img class="w-full" :src="icon || backIcon" @click="onClick" />
  </VanFloatingBubble>
</template>
