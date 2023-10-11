<script setup lang="ts">
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import '~/assets/css/drive.css'

onMounted(() => {
  const driverObj = driver({
    // showProgress: true,
    popoverClass: 'driverjs-theme',
    allowClose: false,
    doneBtnText: '完成',
    nextBtnText: '下一步',
    prevBtnText: '上一步',
    // progressText: '第{{current}}步，共{{total}}步',
    steps: [
      { element: '.index .header', popover: { title: '头部', description: '这是头部' } },
      { element: '.index .header [t1]', popover: { title: 'Logo', description: '这是Logo' } },
      { element: '.index [t4]', popover: { title: '下一步按钮', description: '这是下一步' } },
    ],
  })
  driverObj.drive()
})
</script>

<template>
  <div class="drive">
    <div class="content"></div>
  </div>
</template>
