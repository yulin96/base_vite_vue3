<script setup lang="ts">
const props = defineProps<{
  username: string
  path: string
}>()
</script>

<template>
  <component
    :is="'wx-open-launch-weapp'"
    id="launch-btn"
    :username="props.username"
    :path="props.path"
    style="position: absolute; top: 0; left: 0; right: 0; bottom: 0"
  >
    <component :is="'script'" type="text/wxtag-template">
      <component :is="'style'"> .btn { position: absolute; top: 0; left: 0; right: 0; bottom: 0; } </component>
      <div class="btn"></div>
    </component>
  </component>
</template>
