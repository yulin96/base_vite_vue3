<script setup lang="ts">
/* 路由动画 */
const { transitionName } = useRouteTransition('Zoom')
/* 分享 */
registerWxShare()
</script>

<template>
  <RouterView class="wrapper" v-slot="{ Component, route }">
    <Transition :name="transitionName">
      <KeepAlive v-if="route.meta.keepAlive">
        <component :is="Component" />
      </KeepAlive>
      <component v-else :is="Component" />
    </Transition>
  </RouterView>
</template>

<style>
html,
body,
.wrapper {
  background-color: #fff;
}
</style>
