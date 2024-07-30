<script setup lang="ts">
import { randomString } from '~/utils/common'

const uuid = randomString()
const uuid2 = randomString()

const props = withDefaults(defineProps<{ barrageList: Array<any>; gap?: number; speed?: number }>(), {
  gap: 20,
  speed: 50,
})

const currentId = defineModel<number>({ required: true })

onMounted(() => {
  const box = document.querySelector(`[uuid="${uuid}"]`) as HTMLDivElement | null
  if (!box) return console.error('box is null')

  for (const item of box.children) {
    item.classList.add(uuid2)
  }

  const parents = document.querySelectorAll(`.${uuid2}`) as NodeListOf<HTMLDivElement>

  const autoCreateBarrage = () => {
    createBarrage({ params: props.barrageList[currentId.value], gap: props.gap, speed: props.speed, parents })
    requestAnimationFrame(autoCreateBarrage)
  }
  autoCreateBarrage()
})

function createBarrage({
  params,
  gap,
  speed,
  parents,
}: {
  params: any
  gap: number
  speed: number
  parents: NodeListOf<HTMLDivElement>
}) {
  if (!params) return

  const index = Array.from(parents).findIndex(
    (item) => item.lastChild === null || (item.lastChild as HTMLDivElement).getBoundingClientRect().right < innerWidth,
  )

  if (index === -1) return

  currentId.value = (currentId.value + 1) % props.barrageList.length

  const barrage = document.createElement('div')
  barrage.classList.add('barrage')
  barrage.style.left = `${innerWidth + gap}px`
  barrage.innerHTML = `
    <img src="${params.img}" alt="${params.name}"/>
    <span>${params.name}：</span>
    <span>${params.content}</span>
  `

  const parent = parents[index]
  parent.appendChild(barrage)

  const offset = Math.floor(innerWidth + barrage.clientWidth + gap)
  gsap.to(barrage, {
    x: -offset,
    z: 0,
    duration: offset / speed,
    ease: 'none',
    onComplete() {
      this.kill()
      parent.removeChild(barrage)
    },
  })
}

//示例：
// <v-barrage v-model="currentId" class="mt-100" :barrage-list="data">
//   <div class="flex h-100 w-full items-center"></div>
//   <div class="mt-60 flex h-100 w-full items-center"></div>
//   <div class="mt-60 flex h-100 w-full items-center"></div>
// </v-barrage>
</script>

<template>
  <div v-bind="{ uuid }" class="barrage-box w-full">
    <slot>
      <div></div>
    </slot>
  </div>
</template>

<style>
.barrage {
  position: absolute;
  border-radius: 50px;
  background-color: #eaf7ff;
  border: 2px solid #333;
  width: max-content;
  padding: 12px 26px;
  font-size: 26px;
  display: flex;
  align-items: center;
}

.barrage img:nth-child(1) {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: inline-block;
}

.barrage span:nth-child(2) {
  margin-left: 10px;
}
</style>
