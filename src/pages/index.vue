<script setup lang="ts">
import * as LivePhotosKit from 'livephotoskit'
console.log(LivePhotosKit)

const test = () => {
  const live1 = document.querySelector('#live1') as HTMLElement

  const player = LivePhotosKit.Player(live1)
  player.play()
}

/*  */
onMounted(() => {
  const live1 = document.querySelector('#live1') as HTMLElement

  const image = new Image()
  image.onload = () => {
    console.log(image.width, image.height)
    const ratio = image.width / image.height
    live1.style.height = `${Math.floor(live1.clientWidth / ratio)}px`
  }
  image.src = 'https://oss.eventnet.cn/H5/zz/auto/1/3/IMG_0047.jpeg'
})
</script>

<template>
  <section class="index">
    <main class="content">
      <div
        id="live1"
        data-live-photo
        data-photo-src="https://oss.eventnet.cn/H5/zz/auto/1/3/IMG_0049.JPEG"
        data-video-src="https://oss.eventnet.cn/H5/zz/auto/1/3/IMG_0049.MOV"
        class="m-auto mt-120 w-600 overflow-hidden rounded-12 border"
      ></div>

      <div @click="test" class="center m-auto mt-60 h-100 w-600 cursor-pointer rounded-full bg-cyan-600 text-white">
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
