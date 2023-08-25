<script setup lang="ts">
const linkTo = inject('linkTo') as ILinkTo

const handleClick = () => {
  linkTo('home')
}
</script>

<template>
  <div class="index">
    <div class="content bg-blue-400">
      <button @click="handleClick">点击</button>
    </div>
  </div>
</template>
