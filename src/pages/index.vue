<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {})
</script>

<template>
  <section>
    <main ref="indexRef" class="index" v-bind="$attrs">
      <div class="content"></div>
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
