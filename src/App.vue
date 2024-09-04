<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import CommonLoading from '~/components/common/loading.vue'
import { useRouteTransition } from '~/hooks/useRouterTransition'
import { registerButtonEffect } from '~/tools/animation/effect'
import { registerWechatShare } from '~/tools/user/share'
import { getWechatConfig } from '~/tools/wx'
import { convertConfigToPx } from '~/utils/convert'
import { isWeChat } from '~/utils/uaParser'

if (isWeChat) {
  registerWechatShare() ?? getWechatConfig()
}

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
  <Toaster :rich-colors="true" :expand="false" position="top-center" :duration="2000" />

  <VanConfigProvider :theme-vars="themeVars" theme-vars-scope="global">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition :name>
          <KeepAlive :include="[]">
            <Suspense @resolve="isReady">
              <component :is="Component" class="wrapper"></component>
              <template #fallback>
                <CommonLoading></CommonLoading>
              </template>
            </Suspense>
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
