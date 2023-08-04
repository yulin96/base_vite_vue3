<script setup lang="ts">
// const { title, desc, link } = SHARE_CONTENT
// title && desc && link && isWeiXin() && isHttps() && WxShare(SHARE_CONTENT, ~link.indexOf('h5.eventnet.cn') ? 2 : 1)

const { transitionName } = useRouteTransition()

// const { $subscribe } = useStore()
// $subscribe((_, store) => {
//   localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(store.user))
// })

const router = useRouter()
const linkTo = (path = '/', query = {}) => {
  router.replace({ path, query })
}
provide('linkTo', linkTo)
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

<style lang="scss">
html,
body {
  background-color: #fff;
}
</style>
