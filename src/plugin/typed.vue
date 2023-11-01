<script setup lang="ts">
import Typed from 'typed.js'
definePage({ meta: { gsapName: 'pages_index', index: 10 } })

onMounted(() => {
  window[gsapAll]['pages_index'] = gsap.context(() => {}, '.pages_index')

  new Typed('#text', {
    strings: ['These are the default values...', 'You know what you should do?', 'You know here', 'Have a great day!'],
    smartBackspace: true,
    typeSpeed: 10,
    backSpeed: 10,
    startDelay: 2000,
    onComplete(self) {
      self.cursor.style.display = 'none'
    },
  })

  new Typed('#input_text', {
    strings: ['请输入^500手机号', '请输入手机号^1000,11位'],
    typeSpeed: 20,
    backDelay: 20,
    startDelay: 1000,
    attr: 'placeholder',
    bindInputFocusEvents: true,
    showCursor: true,
  })
})
</script>

<template>
  <div class="pages_index">
    <div class="content">
      <div class="h-90 leading-[90px]">
        <span id="text"></span>
      </div>

      <div class="h-90 w-600 border">
        <input id="input_text" type="text" class="h-full w-full" />
      </div>
    </div>
  </div>
</template>
