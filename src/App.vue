<script setup lang="ts">
import { useLoading } from '@/hooks/useLoading'
import { useRouteTransition } from '@/hooks/useRouterTransition'
import { getWechatConfig } from '@/shared/third/wx'
import { registerButtonEffect } from '@/shared/user/registerButtonEffect'
import { registerWechatShare } from '@/shared/user/share'
import { isWeChat } from '@/utils/ua'
import type { ConfigProviderThemeVars } from 'vant'
import { nextTick, onMounted, onUnmounted } from 'vue'
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

if (isWeChat()) {
  registerWechatShare() ?? getWechatConfig()
}

registerButtonEffect()

/* 路由动画 */
const { name } = useRouteTransition()

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

const { start, cleanup } = useLoading(window.IMG_RESOURCES ?? [])
onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      start()
    }, 500)
  })
})

onUnmounted(() => {
  cleanup()
})
</script>

<template>
  <Teleport to="body">
    <Toaster :rich-colors="true" :expand="false" position="top-center" :visible-toasts="1" :duration="2000" />
  </Teleport>

  <VanConfigProvider :theme-vars="themeVars" theme-vars-scope="global">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition :name>
          <KeepAlive :exclude="[]">
            <component :is="Component" class="wrapper"></component>
          </KeepAlive>
        </Transition>
      </template>
    </RouterView>
  </VanConfigProvider>
</template>

<style>
html,
body,
.wrapper {
  background-color: var(--main-color);
}
</style>
