<script setup lang="ts">
import { useDraggable } from '@vueuse/core'
import imgBG from '~/assets/imgs/girl.jpg'

const items = ref<HTMLDivElement[]>([])
const { x, y, style } = useDraggable(items.value[0], {})

const puzzleList = ref([1, 3, 2, 4, 5, 6])

function touchStart(e: TouchEvent) {
  const touch = e.touches[0]
  const target = e.target as HTMLDivElement
  console.log(touch.pageX, touch.pageY, target.clientWidth, target.clientHeight)
}

function touchMove(e: TouchEvent) {
  const touch = e.touches[0]
  const target = e.target as HTMLDivElement
  console.log(touch.pageX, touch.pageY, target.clientWidth, target.clientHeight)
}

function getTransform(id: number) {
  if (id === 1) return { '--x': '0%', '--y': '0%' }
  if (id === 2) return { '--x': '100%', '--y': '0%' }
  if (id === 3) return { '--x': '0%', '--y': '100%' }
  if (id === 4) return { '--x': '100%', '--y': '100%' }
  if (id === 5) return { '--x': '0%', '--y': '200%' }
  if (id === 6) return { '--x': '100%', '--y': '200%' }
}

const test = () => {
  puzzleList.value = [1, 2, 3, 4, 5, 6]
}

/*  */
onMounted(() => {
  const puzzleBox = document.querySelector('#puzzle-box')! as HTMLDivElement
  const puzzleBoxWidth = puzzleBox.clientWidth

  const img = new Image()
  img.onload = () => {
    const needHeight = (img.height / img.width) * puzzleBoxWidth
    puzzleBox.style.height = `${needHeight}px`
  }
  img.src = imgBG
})
</script>

<template>
  <section class="index">
    <main class="content pt-90">
      <div id="puzzle-box">
        <div
          @touchstart="touchStart"
          @touchmove="touchMove"
          v-for="(item, index) in puzzleList"
          :key="index"
          :class="`item${item}`"
          ref="items"
          :style="getTransform(index + 1)"
        ></div>
      </div>

      <div @click="test" class="mt-30">测试</div>
    </main>
  </section>
</template>

<style>
#puzzle-box {
  width: 700px;
  position: relative;
}

#puzzle-box > div {
  background-image: url('../assets/imgs/girl.jpg');
  background-size: 200% 300%;
  width: 50%;
  height: 33.33%;
  position: absolute;
  top: 0;
  left: 0;
  border: 0.5px solid rgb(72, 72, 182);
  transition: all 10s ease;
  transform: translate(var(--x), var(--y));
}

#puzzle-box > .item1 {
  background-position: 0% 0%;
}

#puzzle-box > .item2 {
  background-position: 100% 0%;
}

#puzzle-box > .item3 {
  background-position: 0% 50%;
}

#puzzle-box > .item4 {
  background-position: 100% 50%;
}

#puzzle-box > .item5 {
  background-position: 0% 100%;
}

#puzzle-box > .item6 {
  background-position: 100% 100%;
}
</style>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
