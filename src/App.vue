<script setup lang="ts">
import { registerButtonEffect } from '~/tools/animation/effect'
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

const themeVars = convertVantPx({
  black: '#1d1d1f',
  primaryColor: '#344bb6',
  floatingBubbleBackground: 'transparent',

  toastPositionBottomDistance: '9%',
  toastLoadingIconColor: '#111',
  toastFontSize: '30px',
})

onMounted(() => {})
</script>

<template>
  <van-config-provider :theme-vars="themeVars" theme-vars-scope="global">
    // TODO: suspense正确处理时会造成transition异常
    <suspense>
      <router-view class="wrapper" v-slot="{ Component }">
        <transition :name>
          <keep-alive :include="[]">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </suspense>
  </van-config-provider>
</template>

<style>
html,
body,
.wrapper {
  background-color: var(--main-color);
}
</style>
