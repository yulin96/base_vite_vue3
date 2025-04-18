<script setup lang="ts">
import { usePromise } from '@/hooks/usePromise'
import { onMounted } from 'vue'

let arSystem: any
const [arSystemReady, completePromise] = usePromise<void>()

onMounted(() => {
  const sceneEl = document.querySelector('a-scene') as any

  sceneEl.addEventListener('loaded', function () {
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
      mindar-image="filterMinCF:0.0001; filterBeta: 0.001; imageTargetSrc:https://oss.eventnet.cn/H5/zz/test/7/tar.mind; autoStart:false; uiScanning: no;uiLoading:no;"
      vr-mode-ui="enabled: false"
      color-space="sRGB"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        <a-asset-item
          id="tree"
          src="https://oss.eventnet.cn/H5/zz/auto2/a/8/xhs.glb"
        ></a-asset-item>
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      <a-entity class="entity entity1" mindar-image-target="targetIndex: 0" data-card="1号">
      </a-entity>

      <a-entity gltf-model="#tree"></a-entity>
    </a-scene>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
