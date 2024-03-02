<script setup lang="ts">
import { registerWxShare } from './utils/wxShare'

/* 路由动画 */
const { transitionName } = useRouteTransition('slide-cover')
/* 分享 */
registerWxShare()

const linkTo: LinkTo = (name, props) => {
  router.replace({ name, ...props })
}

provide('linkTo', linkTo)

// const { locale } = useI18n()
// const { VITE_APP_LOCALSTORAGE_NAME: localName } = import.meta.env
// watch(locale, (newVal) => {
//   localStorage.setItem((localName || 'test') + '-local', newVal)
// })
</script>

<template>
  <Suspense>
    <RouterView class="wrapper" v-slot="{ Component }">
      <Transition :name="transitionName">
        <KeepAlive :include="[]">
          <component :is="Component" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </Suspense>
</template>

<style>
html,
body,
.wrapper {
  background-color: var(--main-color);
}
</style>
