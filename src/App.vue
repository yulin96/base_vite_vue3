<script setup lang="ts">
import { replace } from '@/router'
provide(toKey, replace)

/* 路由动画 */
const { transitionName } = useRouteTransition('Slide')
/* 分享 */
registerWxShare()
</script>

<template>
  <router-view class="wrapper" v-slot="{ Component, route }">
    <transition :name="transitionName">
      <keep-alive v-if="route.meta.keepAlive">
        <component :is="Component" />
      </keep-alive>
      <component v-else :is="Component" />
    </transition>
  </router-view>
</template>

<style>
html,
body {
  background-color: #fff;
}
</style>
