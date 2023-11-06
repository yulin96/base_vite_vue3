<script setup lang="ts">
/* 路由动画 */
const { transitionName } = useRouteTransition('Slide')
/* 分享 */
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
