<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

/*  */
onMounted(() => {
  const canvas = document.querySelector('#canvas') as HTMLCanvasElement
  canvas.width = +getComputedStyle(canvas).width.replace('px', '')
  canvas.height = +getComputedStyle(canvas).height.replace('px', '')
  const ctx = canvas.getContext('2d')
  if (!ctx) return console.error('Canvas not supported')

  ctx.fillStyle = '#757575'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  useEventListener(canvas, 'touchstart', (e) => {
    console.log(e)
  })
  useEventListener(canvas, 'touchmove', (e) => {
    const rect = canvas.getBoundingClientRect()
    const touch = e.touches[0]
    console.log(touch.clientX - rect.left, touch.clientY - rect.top)

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(touch.clientX - rect.left, touch.clientY - rect.top, 20, 0, Math.PI * 2, false)
    ctx.fill()
  })
  useEventListener(canvas, 'touchend', (e) => {
    console.log(checkScratchCompletion(canvas, ctx))
  })
})

function checkScratchCompletion(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const pixels = imageData.data
  let scratchedPixels = 0
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] === 0) {
      // 透明像素
      scratchedPixels++
    }
  }
  const totalPixels = canvas.width * canvas.height
  const scratchPercent = (scratchedPixels / totalPixels) * 100

  return scratchPercent > 50
}
</script>

<template>
  <section class="index">
    <main class="content flex flex-col items-center pt-100">
      <div class="relative h-200 w-500 border">
        1231231 123123123
        <canvas id="canvas" class="absolute left-0 top-0 h-full w-full"></canvas>
      </div>
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
