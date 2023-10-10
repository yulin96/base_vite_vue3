<script setup lang="ts">
/* 路由动画 */
const { transitionName } = useRouteTransition('Slide')
/* 分享 */
registerWxShare()
</script>

<template>
  <!-- <v-new-back
    :icon="'https://oss.eventnet.cn/H5/zz/celoma/back_t.png'"
    :link-map="{ reg: 'home', line: 'home', index: 'index' }"></v-new-back> -->

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
