<template>
  <div class="half-ring center fixed left-0 top-0 h-[80vh] w-[100vw]"></div>
</template>

<style>
@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.half-ring:before {
  animation: spin 1s infinite linear;
  border-radius: 25px;
  box-shadow:
    50px 0px 0 0 #1b6ef333,
    40px 28px 0 0 #1b6ef366,
    15px 47px 0 0 #1b6ef399,
    -15px 47px 0 0 #1b6ef3cc,
    -40px 30px 0 0 #1b6ef3;
  height: 24px;
  width: 24px;
  display: block;
  content: '';
}
</style>
