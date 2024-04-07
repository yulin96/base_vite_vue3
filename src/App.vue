<script setup lang="ts">
import { registerWxShare } from '~/tools/share'

registerWxShare()

/* 路由动画 */
const { name } = useRouteTransition('slide-cover')

const linkTo: LinkTo = (name, props) => {
  router.replace({ name, ...props })
}

provide('linkTo', linkTo)

// const { locale } = useI18n()
// const { VITE_APP_LOCALSTORAGE_NAME: localName } = import.meta.env
// watch(locale, (newVal) => {
//   localStorage.setItem(`${(localName || 'test')}-local`, newVal)
// })

onMounted(() => {})
</script>

<template>
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <transition :name>
        <keep-alive :include="[]">
          <suspense>
            <component class="wrapper" :is="Component"></component>
            <template #fallback>
              <div class="center h-full w-full">
                <z-loading></z-loading>
              </div>
            </template>
          </suspense>
        </keep-alive>
      </transition>
    </template>
  </router-view>
</template>

<style>
html,
body,
.wrapper {
  background-color: var(--main-color);
}
</style>
