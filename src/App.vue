<script setup lang="ts">
registerWxShare()

const router = useRouter()
const linkTo = (name = 'index', query = {}, params = {}) => {
  router.replace({ name, query, params })
}
provide('linkTo', linkTo)

const { transitionName } = useRouteTransition()
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
