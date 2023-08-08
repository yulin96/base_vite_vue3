<script setup lang="ts">
// const shareContent = {
//   title: '',
//   desc: '',
//   link: '',
//   imgUrl: '',
// }
// isWeiXin() && isHttps() && WxShare(shareContent, ~shareContent.link.indexOf('h5.eventnet.cn') ? 2 : 1)

// const { $subscribe } = useStore()
// $subscribe((_, store) => {
//   localStorage.setItem(import.meta.env.VITE_LOCALSTORAGE_NAME, JSON.stringify(store.user))
// })

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

<style lang="scss">
html,
body {
  background-color: #fff;
}
</style>
