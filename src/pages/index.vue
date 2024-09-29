<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { v4 } from 'uuid'
import left from '~/assets/imgs/left.png'
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
  console.log('ArrowLeft')

  const box = document.getElementById(`box_left`)!
  const firstChild = box.querySelectorAll('img')[1]
  if (firstChild) {
    const top = firstChild.getBoundingClientRect().top
    const bottom = firstChild.getBoundingClientRect().bottom
    console.log(top, bottom)

    if (top < successList[0][1]) {
      console.log('success')
      console.log(firstChild.dataset.id)
      if (firstChild.dataset.id) {
        if (goodList.includes(firstChild.dataset.id)) return
        goodList.push(firstChild.dataset.id)
      }
      console.log(goodList)
    } else {
      console.log('fail')
    }
  }
})

onKeyStroke('ArrowUp', (e) => {
  e.preventDefault()
  console.log('ArrowUp')
})

onKeyStroke('ArrowDown', (e) => {
  e.preventDefault()
  console.log('ArrowDown')
})

onKeyStroke('ArrowRight', (e) => {
  e.preventDefault()
  console.log('ArrowRight')
})

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
  image.src = left
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
