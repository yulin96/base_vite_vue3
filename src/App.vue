<script setup lang="ts">
/* 路由动画 */
const { transitionName } = useRouteTransition('Zoom')
/* 分享 */
registerWxShare()
</script>

<template>
  <router-view class="wrapper" v-slot="{ Component, route }">
    <transition :name="transitionName">
      <keep-alive exclude="">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style>
html,
body,
.wrapper {
  background-color: #fff;
}
</style>
