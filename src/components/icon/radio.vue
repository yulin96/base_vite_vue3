<script setup lang="ts">
defineProps<{ checked?: boolean }>()
</script>

<template>
  <svg
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="12428"
    width="200"
    height="200"
  >
    <path
      d="M512 810.667c-164.693 0-298.667-134.016-298.667-298.667s133.973-298.667 298.667-298.667c164.651 0 298.667 134.016 298.667 298.667s-134.016 298.667-298.667 298.667zM512 253.184c-142.72 0-258.859 116.096-258.859 258.816s116.139 258.816 258.859 258.816c142.763 0 258.816-116.181 258.816-258.816 0-142.763-116.053-258.816-258.816-258.816z"
      p-id="12429"
      fill="currentColor"
    ></path>
    <path
      d="M682.667 512c0 94.257-76.41 170.667-170.667 170.667s-170.667-76.41-170.667-170.667c0-94.257 76.41-170.667 170.667-170.667s170.667 76.41 170.667 170.667z"
      p-id="12430"
      fill="currentColor"
      class="origin-center transition-all duration-150 ease-in-out"
      :class="[checked ? 'scale-100 opacity-100' : 'scale-75 opacity-0']"
    ></path>
  </svg>
</template>
