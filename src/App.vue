<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import CommonLoading from '~/components/common/loading.vue'
import { useRouteTransition } from '~/hooks/useRouterTransition'
import { registerButtonEffect } from '~/tools/animation/effect'
import { registerWechatShare } from '~/tools/userExperience'
import { convertConfigToPx } from '~/utils/convert'

registerWechatShare()

registerButtonEffect()

/* 路由动画 */
const { name, isReady } = useRouteTransition('zoom')

// const { locale } = useI18n()
// const { VITE_APP_LOCALSTORAGE_NAME: localName } = import.meta.env
// watch(locale, (newVal) => {
//   localStorage.setItem(`${(localName || 'test')}-local`, newVal)
// })

const themeVars = convertConfigToPx({
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
  <Toaster richColors position="top-center" :duration="1600" />

  <van-config-provider :theme-vars="themeVars" theme-vars-scope="global">
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <transition :name>
          <keep-alive :include="[]">
            <suspense @resolve="isReady">
              <component :is="Component" class="wrapper"></component>
              <template #fallback>
                <common-loading></common-loading>
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
