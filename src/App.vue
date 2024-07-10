<script setup lang="ts">
import { useRouteTransition } from '~/hooks/useRouterTransition'
import { registerButtonEffect } from '~/tools/animation/effect'
import { registerWxShare } from '~/tools/share'
import { convertConfigToPx } from '~/utils/convert'

registerWxShare()

registerButtonEffect()

/* 路由动画 */
const { name, transitionEnter } = useRouteTransition('zoom')

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
  <van-config-provider :theme-vars="themeVars" theme-vars-scope="global">
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <transition :name @enter="transitionEnter">
          <keep-alive :include="[]">
            <suspense>
              <component :is="Component" class="wrapper"></component>
              <template #fallback>
                <mask-loading></mask-loading>
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
