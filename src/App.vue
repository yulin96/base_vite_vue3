<script setup lang="ts">
registerWxShare()

const { VITE_APP_LOCALSTORAGE_NAME: localName } = import.meta.env
const { $subscribe } = useStore()
$subscribe((_, store) => {
  localName && localStorage.setItem(localName, JSON.stringify(store.user))
})

const router = useRouter()
const linkTo = (name = 'index', query = {}, params = {}) => {
  router.replace({ name, query, params })
}
provide('linkTo', linkTo)

const { transitionName } = useRouteTransition()
</script>

<template>
  <router-view class="router-view" v-slot="{ Component, route }">
    <transition :name="transitionName">
      <keep-alive v-if="route.meta.keepAlive">
        <component class="wrapper" :is="Component" />
      </keep-alive>
      <component class="wrapper" v-else :is="Component" />
    </transition>
  </router-view>
</template>

<style>
html,
body {
  background-color: #fff;
}
</style>
