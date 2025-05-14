<script setup lang="ts">
defineProps<{ checked?: boolean; color?: string }>()
</script>

<template>
  <div
    class="rounded-12 size-90 overflow-hidden border-[0.5rem] border-current transition-all duration-150 ease-in-out"
    :class="[checked ? 'bg-current' : 'bg-transparent']"
  >
    <svg
      class="icon h-full w-full origin-center transition-all duration-150 ease-in-out"
      :class="[checked ? 'scale-100' : 'scale-75']"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="11383"
      width="200"
      height="200"
    >
      <path
        d="M416.832 798.08C400.64 798.08 384.512 791.872 372.16 779.52L119.424 525.76C94.784 500.992 94.784 460.8 119.424 436.032 144.128 411.264 184.128 411.264 208.768 436.032L416.832 644.928 814.4 245.76C839.04 220.928 879.04 220.928 903.744 245.76 928.384 270.528 928.384 310.656 903.744 335.424L461.504 779.52C449.152 791.872 432.96 798.08 416.832 798.08Z"
        :fill="color || '#fff'"
        p-id="11384"
      ></path>
    </svg>
  </div>
</template>
