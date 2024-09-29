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
      createRun(type)
      startGame()
    },
    randomNum(600, 1000),
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
    if (top < successList[0][1]) {
      if (firstChild.dataset.id) {
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

function createRun(type: direction, duration = 5) {
  const box = document.getElementById(`box_${type}`)!

  const image = document.createElement('img')
  image.src = type == 'left' ? left : type == 'up' ? up : type == 'down' ? down : right
  image.style.width = '100px'
  image.style.position = 'absolute'
  image.style.top = '100%'
  image.dataset.id = v4()
  box.appendChild(image)

  const ani = gsap.to(image, {
    y: -innerHeight,
    duration,
    ease: 'none',
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
          autoAlpha: 0,
          duration: 0.6,
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
    <main class="content flex items-center justify-evenly">
      <div id="box_left" class="relative h-[100vh] w-100 bg-blue-600/20">
        <img id="base_left" class="size-100" src="../assets/imgs/runleft.png" />
      </div>
      <div id="box_up" class="relative h-[100vh] w-100 bg-blue-600/20">
        <img id="base_up" class="size-100" src="../assets/imgs/runup.png" />
      </div>
      <div id="box_down" class="relative h-[100vh] w-100 bg-blue-600/20">
        <img id="base_down" class="size-100" src="../assets/imgs/rundown.png" />
      </div>
      <div id="box_right" class="relative h-[100vh] w-100 bg-blue-600/20">
        <img id="base_right" class="size-100" src="../assets/imgs/runright.png" />
      </div>
    </main>
    <!-- <div class="fix">开始游戏</div> -->
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
