<script setup lang="ts">
import Zoomist from '~/tools/zoomist'

const props = withDefaults(defineProps<{ url: string; fillType?: 'cover' | 'contain' | 'none' }>(), {
  fillType: 'cover',
})

const uuid = 'zoomist_' + +new Date()

let zoom: any = null

watchPostEffect(() => {
  if (props.url) {
    const dom = document.querySelector(`.zoomist.${uuid}`)
    if (dom) {
      if (zoom) zoom?.update()
      else zoom = new Zoomist(dom, { height: false, fill: props.fillType })
    } else showDialog({ message: 'NOT_HAVE_DOM' })
  }
})
</script>

<template>
  <div :class="[uuid]" class="zoomist h-full w-full" :data-zoomist-src="props.url"></div>
</template>
