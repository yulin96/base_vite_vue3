<script setup lang="ts">
import { usePromise } from '@/hooks/usePromise'
import Hammer from 'hammerjs'
import { nextTick, onMounted } from 'vue'

let arSystem: any
const [arSystemReady, completePromise] = usePromise<void>()
let model: any
let isTargetFound = false

onMounted(async () => {
  await nextTick()
  const sceneEl = document.querySelector('a-scene') as any
  sceneEl.addEventListener('loaded', function () {
    sceneEl.classList.remove('hidden')
    console.log('MindAR loaded')

    try {
      arSystem = sceneEl.systems['mindar-image-system']
      completePromise()
      setTimeout(() => {
        arSystem.start()
        model = sceneEl.querySelector('a-gltf-model')
      }, 1200)
    } catch (error) {
      console.log(error)
    }
  })
  sceneEl.addEventListener('arError', (event) => {
    console.log('MindAR failed to start')
  })
  sceneEl.addEventListener('arReady', (event) => {
    console.log('MindAR is ready')
  })
  document.querySelectorAll('.entity').forEach((entity) => {
    entity.addEventListener('targetFound', () => {
      console.log('targetFound')
      isTargetFound = true
    })
    entity.addEventListener('targetLost', () => {
      console.log('targetLost')
      isTargetFound = false
    })
  })

  const index = document.querySelector('body')
  const manager = new Hammer(index!)
  let lastX = 0
  let lastY = 0

  manager.on('panstart', (e) => {
    lastX = e.deltaX
    lastY = e.deltaY
  })

  manager.on('panmove', (e) => {
    const diffX = e.deltaX - lastX
    if (model) {
      const { x, y, z } = model.getAttribute('rotation')
      model.setAttribute('rotation', { x: x, y: y + diffX * 1, z: z })
    }

    lastX = e.deltaX
    lastY = e.deltaY
  })

  setInterval(() => {
    const video = document.querySelector('.index video') as HTMLVideoElement
    if (video) {
      console.log('video', video)
      video.play()
    }
  }, 1000)
})
</script>

<template>
  <section class="index group">
    <main class="content"></main>

    <a-scene
      id="scene"
      class="hidden"
      mindar-image="filterMinCF:0.0001; filterBeta: 0.001;imageTargetSrc:https://oss.eventnet.cn/H5/zz/test/7/tar.mind; autoStart:false;"
      vr-mode-ui="enabled: false"
      color-space="sRGB"
      device-orientation-permission-ui="enabled: false"
    >
      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      <a-assets>
        <a-asset-item
          id="avatarModel"
          src="https://oss.eventnet.cn/H5/zz/auto2/a/8/xhs6.glb"
        ></a-asset-item>
      </a-assets>

      <a-entity class="entity entity1" mindar-image-target="targetIndex: 0" data-card="1号">
        <a-gltf-model
          rotation="0 0 0"
          position="0 -0.5 0.1"
          scale="0.2 0.2 0.2"
          src="#avatarModel"
          gesture-handler="minScale: 0.1; maxScale: 2"
        >
        </a-gltf-model>
      </a-entity>
    </a-scene>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 20 } }
</route>
