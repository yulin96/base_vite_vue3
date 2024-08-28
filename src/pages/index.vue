<script setup lang="ts">
import * as fabric from 'fabric'
import testImg from '~/assets/imgs/1-B5XLqXhj.jpg'

let fabricIns: fabric.Canvas
const test = () => {
  const img = new Image()

  img.onload = () => {
    const fabricImg = new fabric.FabricImage(img, {
      width: 100,
      height: 100,
    })
    fabricIns.add(fabricImg)
  }
  img.src = testImg
}

const test2 = () => {
  console.log(fabricIns.toDataURL())
}

/*  */
onMounted(() => {
  fabricIns = new fabric.Canvas('fabricBox', {
    width: innerWidth,
    height: innerHeight,
  })
  fabric.InteractiveFabricObject.ownDefaults = {
    ...fabric.InteractiveFabricObject.ownDefaults,
    cornerColor: '#362493',
    cornerStyle: 'circle',
  }
})
</script>

<template>
  <section class="index">
    <main class="content bg-gradient-to-b from-indigo-300 to-red-400">
      <canvas id="fabricBox"></canvas>
      <div @click="test" class="center fixed bottom-[220px] h-100 w-full border">测试</div>
      <div @click="test2" class="center fixed bottom-60 h-100 w-full border">测试2</div>
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
