<script setup lang="ts">
import Zoomist from 'zoomist'
import { showDialog } from 'vant'

const props = defineProps<{ url: string; fillType?: 'cover' | 'contain' | 'none' }>()

const uuid = 'zoomist_' + +new Date()

let zoomist: Zoomist | null = null

watchPostEffect(() => {
  if (props.url) {
    const zoomEle = document.querySelector(`.zoomist.${uuid}`)
    if (zoomEle) {
      if (zoomist) zoomist.update()
      else zoomist = new Zoomist(zoomEle, { height: false, fill: props.fillType ?? 'cover' })
    } else showDialog({ message: 'NOT_HAVE_DOM' })
  }
})
</script>

<template>
  <div :class="[uuid]" class="zoomist h-full w-full" :data-zoomist-src="props.url"></div>
</template>
