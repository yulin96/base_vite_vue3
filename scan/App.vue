<script setup lang="ts">
import { wxPreventShare } from '~/utils/wx'

/* 路由动画 */
const { transitionName } = useRouteTransition()
/* 分享 */
wxPreventShare()
</script>

<template>
  <router-view class="wrapper" v-slot="{ Component }">
    <transition :name="transitionName">
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
