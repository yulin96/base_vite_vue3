<script setup lang="ts">
import { useStore } from '~/stores'
import type { linkMapType } from '~/utils/typings'

const { icon, axis, magnetic, linkMap } = defineProps<{
  icon: string
  axis?: 'x' | 'y' | 'xy'
  magnetic?: 'x' | 'y'
  linkMap: linkMapType
}>()

const { user } = useStore()

const router = useRouter()

const backIns = ref({
  show: false,
  name: '/' as keyof linkMapType,
  offset: {
    x: user.other?.offsetX ?? innerWidth - 60,
    y: user.other?.offsetY ?? innerHeight - 200,
  },
  onClick() {
    router.replace({ name: this.name || '/' })
  },
})

const offsetChange = ({ x, y }: Record<'x' | 'y', number>) => {
  user.other.offsetX = ~~x
  user.other.offsetY = ~~y
}

const route = useRoute()
watch(
  () => route.name,
  (newVal) => {
    const name = newVal as string
    if (name && linkMap?.[name]) {
      backIns.value.name = linkMap[name]
      backIns.value.show = true
    } else {
      backIns.value.show = false
    }
  },
  { immediate: true },
)
</script>

<template>
  <van-floating-bubble
    @offset-change="offsetChange"
    @click="backIns.onClick()"
    :class="!backIns.show ? 'pointer-events-none' : ''"
    class="p-0"
    :offset="backIns.offset"
    :icon="icon"
    :axis="axis ?? 'xy'"
    :magnetic="magnetic ?? 'x'"
    :gap="10"
  >
    <transition name="scale">
      <img v-if="backIns.show" class="w-full" :src="icon" />
    </transition>
  </van-floating-bubble>
</template>

<style>
.van-floating-bubble .van-icon {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.van-floating-bubble .van-icon img {
  width: 100%;
  height: 100%;
}
</style>
