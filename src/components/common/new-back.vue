<script setup lang="ts">
import { useStore } from '~/stores'
import type { linkMapType } from '~/utils/typings'

const props = defineProps<{
  icon: string
  axis?: 'x' | 'y' | 'xy'
  magnetic?: 'x' | 'y'
  linkMap: linkMapType
}>()

const { user } = useStore()

const offsetX = computed(() => user.offsetX)
const offsetY = computed(() => user.offsetY)

const router = useRouter()

const backIns = ref({
  show: false,
  name: '/' as keyof linkMapType,
  offset: { x: 0, y: 0 },
  onClick() {
    router.replace({ name: this.name || '/' })
  },
})

watch(
  [offsetX, offsetY],
  () => {
    backIns.value.offset.x = offsetX.value ?? innerWidth - 60
    backIns.value.offset.y = offsetY.value ?? innerHeight - 200
  },
  { immediate: true },
)

const offsetChange = ({ x, y }: Record<'x' | 'y', number>) => {
  user.offsetX = ~~x
  user.offsetY = ~~y
}

const route = useRoute()
watch(
  () => route.name,
  (newVal) => {
    const name = newVal as string
    if (name && props.linkMap?.[name]) {
      backIns.value.name = props.linkMap[name]
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
    v-if="backIns.show"
    class="size-90"
    @offset-change="offsetChange"
    :offset="backIns.offset"
    :icon="props.icon"
    :axis="props.axis ?? 'xy'"
    :magnetic="props.magnetic ?? 'x'"
    :gap="10"
    @click="backIns.onClick()"
  >
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
