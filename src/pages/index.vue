<script setup lang="ts">
const list = ref([1, 2, 3, 6, 4, 5])

const puzzlePointList: { center: [number, number] }[] = []
let index = 0
const load = () => {
  if (++index == 6) {
    nextTick(() => {
      const dom = document.querySelectorAll('.offsetAni')
      dom.forEach((item) => {
        const rect = item.getBoundingClientRect()
        puzzlePointList.push({
          center: [rect.left + rect.width / 2, rect.top + rect.height / 2],
        })
      })
      console.log(puzzlePointList)
    })
  }
}

let isMoving = false
let moveDom: null | HTMLImageElement = null
let startX = 0
let startY = 0

const touchstart = (e: TouchEvent) => {
  e.stopPropagation()
  e.preventDefault()

  if (isMoving || !puzzlePointList.length) return

  isMoving = true
  moveDom = e.target as HTMLImageElement
  startX = e.touches[0].clientX
  startY = e.touches[0].clientY
}

const touchmove = (e: TouchEvent) => {
  e.stopPropagation()
  e.preventDefault()

  if (moveDom !== e.target || !moveDom) return

  const touch = e.changedTouches[0]
  const offsetX = touch.clientX - startX
  const offsetY = touch.clientY - startY
  moveDom.style.setProperty('--offsetX', `${offsetX}px`)
  moveDom.style.setProperty('--offsetY', `${offsetY}px`)
  moveDom.style.pointerEvents = 'none'
  moveDom.style.position = 'relative'
  moveDom.style.zIndex = '100'
}

const touchend = async (e: TouchEvent) => {
  e.stopPropagation()
  e.preventDefault()

  if (moveDom !== e.target || !moveDom) return

  isMoving = false

  const touch = e.changedTouches[0]
  const newDom = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLImageElement
  if (newDom && moveDom && newDom.getAttribute('isPuzzle') && moveDom.getAttribute('isPuzzle')) {
    const moveIndex = list.value.findIndex((item) => item === Number(moveDom!.getAttribute('isPuzzle')))
    const newIndex = list.value.findIndex((item) => item === Number(newDom.getAttribute('isPuzzle')))
    const moveCenter = puzzlePointList[moveIndex].center
    const newCenter = puzzlePointList[newIndex].center

    moveDom.style.transition = 'transform 0.3s ease'
    newDom.style.transition = 'transform 0.3s ease'
    moveDom.style.setProperty('--offsetX', `${newCenter[0] - moveCenter[0]}px`)
    moveDom.style.setProperty('--offsetY', `${newCenter[1] - moveCenter[1]}px`)
    newDom.style.setProperty('--offsetX', `${moveCenter[0] - newCenter[0]}px`)
    newDom.style.setProperty('--offsetY', `${moveCenter[1] - newCenter[1]}px`)
    setTimeout(() => {
      ;[list.value[moveIndex], list.value[newIndex]] = [list.value[newIndex], list.value[moveIndex]]
      reset()
      nextTick(() => {
        console.log(list.value.every((item, index) => item === index + 1))
      })
    }, 300)
  } else {
    reset()
  }
}

function reset() {
  const dom = document.querySelectorAll('.offsetAni') as NodeListOf<HTMLImageElement>
  dom.forEach((ele) => {
    ele.style.removeProperty('--offsetX')
    ele.style.removeProperty('--offsetY')
    ele.style.pointerEvents = 'auto'
    ele.style.position = 'static'
    ele.style.zIndex = '0'
    ele.style.transition = 'none'
  })
}

/*  */
onMounted(() => {})
</script>

<template>
  <section class="index">
    <main class="content flex flex-col items-center pt-90">
      <div class="flex w-600 flex-wrap items-start border">
        <img
          @load="load"
          v-for="item in list"
          :key="item"
          :isPuzzle="item"
          class="offsetAni w-1/2 outline outline-red-600"
          @touchstart="touchstart"
          @touchmove="touchmove"
          @touchend="touchend"
          :src="`https://oss.eventnet.cn/H5/zz/auto/tcl2407_20240722/1/${item}.jpg`"
        />
      </div>
    </main>
  </section>
</template>

<style>
.offsetAni {
  transform: translate3d(var(--offsetX, 0), var(--offsetY, 0), 0);
}
</style>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
