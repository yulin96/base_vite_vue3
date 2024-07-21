<script setup lang="ts">
import { shuffle } from 'lodash-es'
import imgBG from '~/assets/imgs/girl.jpg'
import { showToast } from '~/tools/toast'

const puzzleList = ref(shuffle([1, 2, 3, 4, 5, 6]))

const moveIns = {
  boundList: [] as DOMRect[],
  ele: null as null | HTMLDivElement,
  startIndex: 0,
  startX: 0,
  startY: 0,
  gsapToX: null as null | any,
  gsapToY: null as null | any,
}

function touchStart(e: TouchEvent) {
  if (!moveIns.boundList || moveIns.ele) return
  const target = e.target as HTMLDivElement
  if (!target) return

  moveIns.ele = document.createElement('div')
  moveIns.ele.classList.add(target.classList[0])
  moveIns.ele.style.position = 'fixed'
  moveIns.ele.style.zIndex = '9999'
  moveIns.ele.style.width = `${target.clientWidth}px`
  moveIns.ele.style.height = `${target.clientHeight}px`
  moveIns.ele.style.left = `${target.getBoundingClientRect().left}px`
  moveIns.ele.style.top = `${target.getBoundingClientRect().top}px`
  moveIns.ele.style.opacity = '0.9'

  document.body.appendChild(moveIns.ele)

  const touch = e.touches[0]
  moveIns.startX = touch.pageX
  moveIns.startY = touch.pageY

  moveIns.gsapToX = gsap.quickTo(moveIns.ele, 'x', { duration: 0.1, ease: 'power1' })
  moveIns.gsapToY = gsap.quickTo(moveIns.ele, 'y', { duration: 0.1, ease: 'power1' })

  const index = moveIns.boundList.findIndex(
    (item) =>
      item.left < touch.pageX && touch.pageX < item.right && item.top < touch.pageY && touch.pageY < item.bottom,
  )
  if (index === -1) return
  moveIns.startIndex = index
}

function touchMove(e: TouchEvent) {
  if (!moveIns.ele) return
  const touch = e.changedTouches[0]
  moveIns.gsapToX(touch.pageX - moveIns.startX)
  moveIns.gsapToY(touch.pageY - moveIns.startY)
}

function touchEnd(e: TouchEvent) {
  if (!moveIns.ele) return
  const touch = e.changedTouches[0]
  const index = moveIns.boundList.findIndex(
    (item) =>
      item.left < touch.pageX && touch.pageX < item.right && item.top < touch.pageY && touch.pageY < item.bottom,
  )

  document.body.removeChild(moveIns.ele!)

  if (index == -1 || index == moveIns.startIndex) {
    moveIns.ele = null
    return
  }

  const _gsapFunc = gsap
    .timeline({
      onComplete: () => {
        _gsapFunc.revert()
        _gsapFunc.kill()
        ;[puzzleList.value[moveIns.startIndex], puzzleList.value[index]] = [
          puzzleList.value[index],
          puzzleList.value[moveIns.startIndex],
        ]
        moveIns.ele = null

        const isWin = puzzleList.value.every((item, index) => item === index + 1)
        if (isWin) {
          showToast({ message: 'win' })
        }
      },
    })
    .to(`#puzzle-box > div:nth-child(${moveIns.startIndex + 1})`, {
      x: moveIns.boundList[index].right - moveIns.boundList[moveIns.startIndex].right,
      y: moveIns.boundList[index].bottom - moveIns.boundList[moveIns.startIndex].bottom,
      ease: 'power3',
      duration: 0.3,
    })
    .to(
      `#puzzle-box > div:nth-child(${index + 1})`,
      {
        x: moveIns.boundList[moveIns.startIndex].left - moveIns.boundList[index].left,
        y: moveIns.boundList[moveIns.startIndex].top - moveIns.boundList[index].top,
        ease: 'power3',
        duration: 0.3,
      },
      '<',
    )

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
  const startIndex = 0
  const endIndex = 3

  const _gsapFunc = gsap
    .timeline({
      onComplete: () => {
        _gsapFunc.revert()
        _gsapFunc.kill()
        ;[puzzleList.value[startIndex], puzzleList.value[endIndex]] = [
          puzzleList.value[endIndex],
          puzzleList.value[startIndex],
        ]
      },
    })
    .to(`#puzzle-box > div:nth-child(${startIndex + 1})`, {
      x: moveIns.boundList[endIndex].right - moveIns.boundList[startIndex].right,
      y: moveIns.boundList[endIndex].bottom - moveIns.boundList[startIndex].bottom,
      ease: 'power2',
      duration: 0.5,
    })
    .to(
      `#puzzle-box > div:nth-child(${endIndex + 1})`,
      {
        x: moveIns.boundList[startIndex].left - moveIns.boundList[endIndex].left,
        y: moveIns.boundList[startIndex].top - moveIns.boundList[endIndex].top,
        ease: 'power2',
        duration: 0.5,
      },
      '<',
    )

  // puzzleList.value = [1, 2, 3, 4, 5, 6]
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
      <div id="puzzle-box" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <div v-for="(item, index) in puzzleList" :key="index" :data-id="`${index}`" :class="`item${item}`"></div>
      </div>

      <div @click="test" class="mt-30">测试</div>
    </main>
  </section>
</template>

<style>
#puzzle-box {
  width: 700px;
  display: flex;
  flex-wrap: wrap;
}

.item1 {
  background-image: url('../assets/imgs/girl.jpg');
  background-size: 200% 300%;
  width: 50%;
  height: 33.33%;
  border: 0.5px solid rgb(72, 72, 182);
  background-position: 0% 0%;
}

.item2 {
  background-image: url('../assets/imgs/girl.jpg');
  background-size: 200% 300%;
  width: 50%;
  height: 33.33%;
  border: 0.5px solid rgb(72, 72, 182);
  background-position: 100% 0%;
}

.item3 {
  background-image: url('../assets/imgs/girl.jpg');
  background-size: 200% 300%;
  width: 50%;
  height: 33.33%;
  border: 0.5px solid rgb(72, 72, 182);
  background-position: 0% 50%;
}

.item4 {
  background-image: url('../assets/imgs/girl.jpg');
  background-size: 200% 300%;
  width: 50%;
  height: 33.33%;
  border: 0.5px solid rgb(72, 72, 182);
  background-position: 100% 50%;
}

.item5 {
  background-image: url('../assets/imgs/girl.jpg');
  background-size: 200% 300%;
  width: 50%;
  height: 33.33%;
  border: 0.5px solid rgb(72, 72, 182);
  background-position: 0% 100%;
}

.item6 {
  background-image: url('../assets/imgs/girl.jpg');
  background-size: 200% 300%;
  width: 50%;
  height: 33.33%;
  border: 0.5px solid rgb(72, 72, 182);
  background-position: 100% 100%;
}
</style>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
