<script setup lang="ts">
import type { RouteNamedMap } from 'vue-router/auto/routes'
registerWxShare()

const { transitionName } = useRouteTransition('leftFlyOut')
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
