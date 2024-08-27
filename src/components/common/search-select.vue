<script setup lang="ts">
const selectValue = defineModel()
const props = defineProps<{ list: { key: string | number; value: string }[] }>()

const searchIns = ref({
  value: '',
  show: false,
  list: computed(() => {
    if (searchIns.value.value) {
      return props.list.filter((item) => item.value.includes(searchIns.value.value))
    } else {
      return props.list
    }
  }),
})

watch(
  () => searchIns.value.show,
  (nv) => {
    if (!nv) searchIns.value.value = ''
  },
)

const choose = (item: string) => {
  selectValue.value = item
}

onMounted(() => {
  const el = document.querySelector('[data-search-select]')!
  const parent = el.parentElement!

  parent.addEventListener('click', (e) => {
    searchIns.value.show = !searchIns.value.show
  })

  onClickOutside(ref(parent), () => {
    searchIns.value.show = false
  })
})
</script>

<template>
  <Transition name="slide-down">
    <div
      data-search-select
      ref="el"
      v-show="searchIns.show"
      class="absolute top-[100%] flex h-600 w-full flex-col overflow-hidden rounded-6 bg-white shadow-lg"
    >
      <VanSearch @click.stop v-model="searchIns.value" placeholder="请输入搜索关键词" />
      <div class="w-full flex-1 overflow-auto">
        <div @click="choose(item.value)" v-for="item in searchIns.list" :key="item.key" class="px-30 py-15">
          {{ item.value }}
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition:
    opacity 0.26s ease,
    transform 0.26s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
</style>
