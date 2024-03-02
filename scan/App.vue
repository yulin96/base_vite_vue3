<script setup lang="ts">
import { wxPreventShare } from '~/tools/wx'

/* 路由动画 */
const { name } = useRouteTransition()
/* 分享 */
wxPreventShare()
</script>

<template>
  <router-view class="wrapper" v-slot="{ Component }">
    <transition :name>
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
html,
body {
  background-color: #fff;
}
</style>
~/tools/wx
