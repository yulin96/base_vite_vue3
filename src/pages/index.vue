<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { v4 } from 'uuid'
import down from '~/assets/imgs/down.png'
import left from '~/assets/imgs/left.png'
import right from '~/assets/imgs/right.png'
import up from '~/assets/imgs/up.png'

import { randomNum } from '~/utils/common'

const successList: [number, number][] = []
const goodList: string[] = []

type direction = 'left' | 'up' | 'down' | 'right'

function startGame() {
  setTimeout(
    () => {
      const randomNumber = Math.floor(Math.random() * 4)
      const type = ['left', 'up', 'down', 'right'][randomNumber] as direction
      createRun(type, 5)
      createRun(type, 5)
      startGame()
    },
    randomNum(500, 1000),
  )
}

onKeyStroke('ArrowLeft', (e) => {
  e.preventDefault()
  checkList('left')
})

onKeyStroke('ArrowUp', (e) => {
  e.preventDefault()
  checkList('up')
})

onKeyStroke('ArrowDown', (e) => {
  e.preventDefault()
  checkList('down')
})

onKeyStroke('ArrowRight', (e) => {
  e.preventDefault()
  checkList('right')
})

function checkList(type: direction) {
  const box = document.getElementById(`box_${type}`)!
  const firstChild = box.querySelector('[data-id]') as HTMLImageElement | null
  if (firstChild) {
    const top = firstChild.getBoundingClientRect().top

    const typeIndex = ['left', 'up', 'down', 'right'].indexOf(type)
    const successNum = successList[typeIndex][1]
    if (top < successNum) {
      if (firstChild.dataset.id) {
        if (successNum - top > 70) {
          console.log('完美')
        } else {
          console.log('及格')
        }

        if (goodList.includes(firstChild.dataset.id)) return
        goodList.push(firstChild.dataset.id)
      }
    }
  }
}

/*  */
onMounted(() => {
  const base_left = document.getElementById('base_left')!
  const base_up = document.getElementById('base_up')!
  const base_down = document.getElementById('base_down')!
  const base_right = document.getElementById('base_right')!

  successList.push([base_left.getBoundingClientRect().top, base_left.getBoundingClientRect().bottom])
  successList.push([base_up.getBoundingClientRect().top, base_up.getBoundingClientRect().bottom])
  successList.push([base_down.getBoundingClientRect().top, base_down.getBoundingClientRect().bottom])
  successList.push([base_right.getBoundingClientRect().top, base_right.getBoundingClientRect().bottom])

  startGame()
})

function createRun(type: direction, duration = 3) {
  const box = document.getElementById(`box_${type}`)!

  const image = document.createElement('img')
  image.src = `https://oss.eventnet.cn/H5/zz/auto/1/1/${type}.png`

  const items = box.querySelectorAll('[data-id]')!
  const ar = items[items.length - 1]

  if (ar) {
    const bottom = ar.getBoundingClientRect().bottom + 20
    image.style.top = `${bottom < innerHeight ? innerHeight : bottom}px`
  } else {
    image.style.top = `${innerHeight}px`
  }

  image.style.width = '100px'
  image.style.height = '100px'
  image.style.position = 'absolute'
  image.style.left = '0'
  image.style.willChange = 'transform'

  image.dataset.id = v4()
  box.appendChild(image)

  const ani = gsap.to(image, {
    y: -innerHeight,
    duration,
    ease: 'none',
    z: 0,
    onComplete: () => {
      if (image.dataset.id && goodList.includes(image.dataset.id)) {
        goodList.splice(goodList.indexOf(image.dataset.id), 1)
        const imgGood = document.createElement('img')
        imgGood.src = type == 'left' ? left : type == 'up' ? up : type == 'down' ? down : right
        imgGood.style.width = '100px'
        imgGood.style.position = 'absolute'
        imgGood.style.top = '0'
        box.appendChild(imgGood)
        gsap.to(imgGood, {
          scale: 2,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out',
          onComplete: () => {
            box.removeChild(imgGood)
          },
        })
      }
      ani.kill()
      box.removeChild(image)
    },
  })
}
</script>

<template>
  <section class="index">
    <main
      class="content flex h-[100vh] items-center justify-evenly overflow-hidden bg-[url(~/assets/imgs/macos-sequoia-1.jpg)] bg-cover"
    >
      <div id="box_left" class="relative h-full w-100">
        <img id="base_left" class="absolute left-0 top-0 size-100" src="../assets/imgs/runleft.png" />
      </div>
      <div id="box_up" class="relative h-full w-100">
        <img id="base_up" class="absolute left-0 top-0 size-100" src="../assets/imgs/runup.png" />
      </div>
      <div id="box_down" class="relative h-full w-100">
        <img id="base_down" class="absolute left-0 top-0 size-100" src="../assets/imgs/rundown.png" />
      </div>
      <div id="box_right" class="relative h-full w-100">
        <img id="base_right" class="absolute left-0 top-0 size-100" src="../assets/imgs/runright.png" />
      </div>
    </main>
    <!-- <div class="fix">开始游戏</div> -->
  </section>
</template>

<style>
.wait {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 100%;
  left: 0;
  will-change: transform;
}
</style>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
