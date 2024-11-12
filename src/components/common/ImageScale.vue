<script setup lang="ts">
import Zoomist from '~/tools/zoomist'

const { fillType = 'cover', url } = defineProps<{
  url: string
  fillType?: 'cover' | 'contain' | 'none'
}>()

const uuid = 'zoomist_' + +new Date()

let zoom: any = null

watchPostEffect(() => {
  if (url) {
    const dom = document.querySelector(`.zoomist.${uuid}`)
    if (dom) {
      if (zoom) zoom?.update()
      else zoom = new Zoomist(dom, { height: false, fill: fillType })
    } else showDialog({ message: 'NOT_HAVE_DOM' })
  }
})
</script>

<template>
  <div :class="[uuid]" class="zoomist h-full w-full" :data-zoomist-src="url"></div>
</template>
