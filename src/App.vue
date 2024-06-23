<script setup lang="ts">
import { registerButtonEffect } from '~/tools/effect'
import { registerWxShare } from '~/tools/share'

registerWxShare()

registerButtonEffect()

/* 路由动画 */
const { name } = useRouteTransition('slide')

// const { locale } = useI18n()
// const { VITE_APP_LOCALSTORAGE_NAME: localName } = import.meta.env
// watch(locale, (newVal) => {
//   localStorage.setItem(`${(localName || 'test')}-local`, newVal)
// })
onMounted(() => {})
</script>

<template>
  <suspense>
    <router-view class="wrapper" v-slot="{ Component }">
      <transition :name>
        <keep-alive :exclude="[]">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </suspense>
</template>

<style>
html,
body,
.wrapper {
  background-color: var(--main-color);
}
</style>
