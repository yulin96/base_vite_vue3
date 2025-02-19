<script setup lang="ts">
import type { ConfigProviderThemeVars } from 'vant'
import { nextTick, onMounted } from 'vue'
import { Toaster } from 'vue-sonner'
import { useLoading } from '~/hooks/useLoading'
import { useRouteTransition } from '~/hooks/useRouterTransition'
import { registerButtonEffect } from '~/tools/animation/effect'
import { registerWechatShare } from '~/tools/user/share'
import { getWechatConfig } from '~/tools/wx'
import { isWeChat } from '~/utils/uaParser'

if (isWeChat) {
  registerWechatShare() ?? getWechatConfig()
}

registerButtonEffect()

/* 路由动画 */
const { name, isReady } = useRouteTransition('slide')

// const { locale } = useI18n()
// const { VITE_APP_LOCALSTORAGE_NAME: localName } = import.meta.env
// watch(locale, (newVal) => {
//   localStorage.setItem(`${(localName || 'test')}-local`, newVal)
// })

const themeVars = {
  black: '#1d1d1f',
  primaryColor: '#344bb6',
  floatingBubbleBackground: 'transparent',

  toastPositionBottomDistance: '9%',
  toastLoadingIconColor: '#111',
} satisfies ConfigProviderThemeVars

const { start } = useLoading(window.IMG_RESOURCES ?? [])
onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      start()
    }, 500)
  })
})
</script>

<template>
  <toaster
    :rich-colors="true"
    :expand="false"
    position="top-center"
    :visible-toasts="2"
    :duration="2000"
  />

  <van-config-provider :theme-vars="themeVars" theme-vars-scope="global">
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <transition :name>
          <keep-alive :exclude="[]">
            <suspense @resolve="isReady">
              <component :is="Component" class="wrapper"></component>
              <template #fallback>
                <com-loading></com-loading>
              </template>
            </suspense>
          </keep-alive>
        </transition>
      </template>
    </router-view>
  </van-config-provider>
</template>

<style>
html,
body,
.wrapper {
  background-color: var(--main-color);
}
</style>
