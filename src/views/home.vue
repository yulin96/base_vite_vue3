<script setup lang="ts">
const linkTo = inject('linkTo') as ILinkTo

const handleClick = () => {
  linkTo('/')
}
</script>

<template>
  <div class="home">
    <div class="content bg-cyan-500">
      <button @click="handleClick">点击</button>
    </div>
  </div>
</template>
