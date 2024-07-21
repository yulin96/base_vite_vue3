<script setup lang="ts">
import imgBG from '~/assets/imgs/girl.jpg'

const puzzleList = ref([1, 3, 2, 4, 5, 6])

const moveIns = {
  boundList: [] as DOMRect[],
  ele: null as null | HTMLDivElement,
  startIndex: 0,
  offsetX: 0,
  offsetY: 0,
  quickSetterX: null as null | Function,
  quickSetterY: null as null | Function,
}

function touchStart(e: TouchEvent) {
  if (!moveIns.boundList) return
  if (moveIns.ele) return
  const target = e.target as HTMLDivElement
  if (!target) return

  const bound = target.getBoundingClientRect()

  moveIns.quickSetterX = gsap.quickTo(target, 'x', { duration: 0.1, ease: 'power3' })
  moveIns.quickSetterY = gsap.quickTo(target, 'y', { duration: 0.1, ease: 'power3' })
  moveIns.offsetX = bound.left + bound.width / 2
  moveIns.offsetY = bound.top + bound.height / 2

  const touch = e.touches[0]
  const index = moveIns.boundList.findIndex(
    (item) =>
      item.left < touch.pageX && touch.pageX < item.right && item.top < touch.pageY && touch.pageY < item.bottom,
  )
  if (index === -1) return
  moveIns.startIndex = index
}

function touchMove(e: TouchEvent) {
  const touch = e.changedTouches[0]

  if (moveIns.quickSetterX) {
    moveIns.quickSetterX(touch.pageX - moveIns.offsetX)
  }
  if (moveIns.quickSetterY) {
    moveIns.quickSetterY(touch.pageY - moveIns.offsetY)
  }
}

function touchEnd(e: TouchEvent) {
  const touch = e.changedTouches[0]
  console.log(touch.pageX, touch.pageY)

  const index = moveIns.boundList.findIndex(
    (item) =>
      item.left < touch.pageX && touch.pageX < item.right && item.top < touch.pageY && touch.pageY < item.bottom,
  )
  console.log(moveIns.startIndex, index)

  const startDom = document.querySelector(`#puzzle-box > div:nth-child(${moveIns.startIndex + 1})`)! as HTMLDivElement
  const endDom = document.querySelector(`#puzzle-box > div:nth-child(${index + 1})`)! as HTMLDivElement

  // TODO:结束
}

function getItemBoundList() {
  const puzzleBox = document.querySelector('#puzzle-box')! as HTMLDivElement
  const items = puzzleBox.children
  const boundList: DOMRect[] = []
  for (let i = 0; i < items.length; i++) {
    boundList.push(items[i].getBoundingClientRect())
  }
  return boundList
}

const test = () => {
  puzzleList.value = [1, 2, 3, 4, 5, 6]
}

/*  */
onMounted(() => {
  const puzzleBox = document.querySelector('#puzzle-box')! as HTMLDivElement
  const puzzleBoxWidth = puzzleBox.clientWidth

  const img = new Image()
  img.onload = async () => {
    const needHeight = (img.height / img.width) * puzzleBoxWidth
    puzzleBox.style.height = `${needHeight}px`

    await nextTick()
    moveIns.boundList = getItemBoundList()
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
          @touchend="touchEnd"
          v-for="(item, index) in puzzleList"
          :key="index"
          :class="`item${item}`"
        ></div>
      </div>

      <div @click="test" class="mt-30">测试</div>
    </main>
  </section>
</template>

<style scoped>
#puzzle-box {
  width: 700px;
  display: flex;
  flex-wrap: wrap;
}

#puzzle-box > div {
  background-image: url('../assets/imgs/girl.jpg');
  background-size: 200% 300%;
  width: 50%;
  height: 33.33%;
  border: 0.5px solid rgb(72, 72, 182);
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
