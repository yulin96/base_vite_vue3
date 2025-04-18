<script setup lang="ts">
import { usePromise } from '@/hooks/usePromise'
import { onMounted, ref } from 'vue'

const arReady = ref(false)

let arSystem: any
const [arSystemReady, completePromise] = usePromise<void>()

onMounted(() => {
  const sceneEl = document.querySelector('a-scene') as any

  sceneEl.addEventListener('loaded', function () {
    sceneEl.classList.remove('hidden')
    console.log('MindAR loaded')
    arSystem = sceneEl.systems['mindar-image-system']
    completePromise()
    arSystem.start()
  })

  sceneEl.addEventListener('arError', (event) => {
    console.log('MindAR failed to start')
  })

  sceneEl.addEventListener('arReady', (event) => {
    console.log('MindAR is ready')
    arReady.value = true
  })

  document.querySelectorAll('.entity').forEach((entity) => {
    entity.addEventListener('targetFound', () => {
      console.log('targetFound')
    })
  })
})
</script>

<template>
  <section class="index group">
    <main class="content"></main>

    <a-scene
      id="scene"
      class="hidden"
      mindar-image="filterMinCF:0.0001; filterBeta: 0.001;imageTargetSrc:https://oss.eventnet.cn/H5/zz/test/7/tar.mind; autoStart:false; uiScanning: no;uiLoading:no;"
      vr-mode-ui="enabled: false"
      color-space="sRGB"
      device-orientation-permission-ui="enabled: false"
    >
      <a-entity mindar-camera>
        <a-camera look-controls="enabled: false">
          <a-entity
            gltf-model="url(https://oss.eventnet.cn/H5/zz/auto2/a/8/xhs6.glb)"
            scale="0.5 0.5 0.5"
            position="0 -0.5 -1"
          ></a-entity>
        </a-camera>
      </a-entity>

      <a-entity class="entity entity1" mindar-image-target="targetIndex: 0" data-card="1号">
        <!-- <a-gltf-model
          rotation="0 0 0 "
          position="0 -0.5 0.1"
          scale="0.2 0.2 0.2"
          src="#avatarModel"
          gesture-handler="minScale: 0.1; maxScale: 2"
        >
        </a-gltf-model> -->
        <!--   animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate" -->
      </a-entity>
    </a-scene>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
