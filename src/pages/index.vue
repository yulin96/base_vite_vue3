<script setup lang="ts">
import * as LivePhotosKit from 'livephotoskit'
console.log(LivePhotosKit)

const test = () => {
  const live1 = document.querySelector('#live1') as HTMLElement

  const player = LivePhotosKit.Player(live1)
  player.play()
}

const test2 = () => {
  const live2 = document.querySelector('#live2') as HTMLElement

  const player = LivePhotosKit.Player(live2)
  player.play()
}

/*  */
onMounted(() => {
  const live1 = document.querySelector('#live1') as HTMLElement

  const image = new Image()
  image.onload = () => {
    const ratio = image.width / image.height
    live1.style.height = `${Math.floor(live1.clientWidth / ratio)}px`
  }
  image.src = 'https://oss.eventnet.cn/H5/zz/auto/1/3/IMG_0047.jpeg'

  const live2 = document.querySelector('#live2') as HTMLElement

  const image2 = new Image()
  image2.onload = () => {
    const ratio = image2.width / image2.height
    live2.style.height = `${Math.floor(live2.clientWidth / ratio)}px`
  }
  image2.src = 'https://oss.eventnet.cn/H5/zz/auto/1/3/1.jpg'
})
</script>

<template>
  <section class="index">
    <main class="content">
      <div class="text-center">苹果 jpeg mov</div>
      <div
        id="live1"
        data-live-photo
        data-photo-src="https://oss.eventnet.cn/H5/zz/auto/1/3/IMG_0049.JPEG"
        data-video-src="https://oss.eventnet.cn/H5/zz/auto/1/3/IMG_0049.MOV"
        class="m-auto mt-20 w-300 overflow-hidden rounded-12 border"
      ></div>

      <div @click="test" class="center m-auto mt-60 h-100 w-300 cursor-pointer rounded-full bg-cyan-600 text-white">
        预览
      </div>

      <hr class="my-20" />
      <div class="text-center">小米 jpg mp4</div>
      <div
        id="live2"
        data-live-photo
        data-photo-src="https://oss.eventnet.cn/H5/zz/auto/1/3/1.jpg"
        data-video-src="https://oss.eventnet.cn/H5/zz/auto/1/3/1.mp4"
        class="m-auto mt-20 w-300 overflow-hidden rounded-12 border"
      ></div>

      <div @click="test2" class="center m-auto mt-60 h-100 w-300 cursor-pointer rounded-full bg-cyan-600 text-white">
        预览
      </div>
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>

<style>
[data-live-photo] .lpk-badge {
  /* opacity: 0; */
  pointer-events: none;
}
</style>
