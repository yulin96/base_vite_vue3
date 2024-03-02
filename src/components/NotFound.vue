<script setup lang="ts">
const router = useRouter()
const toIndex = () => {
  router.replace({ path: '/' })
}

const { user } = useStore()
const id = String(user.userInfo.errId || randomNum(1, 10))
user.userInfo.errId = id

const errorEle = ref<HTMLDivElement | null>(null)

/*  */
onMounted(() => {
  if (!errorEle.value) return console.error('errorEle is null')
  errorEle &&
    lottie?.loadAnimation({
      path: `https://oss.eventnet.cn/H5/zz/public/lotties/404/${id}.json`,
      container: errorEle.value,
      loop: true,
      autoplay: true,
    })
})
</script>

<template>
  <div class="wrapperErr">
    <div class="error">ERROR 404</div>
    <div ref="errorEle"></div>
    <div @click="toIndex" class="back">回首页</div>
  </div>
</template>

<style>
.wrapperErr {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: white;
}

.wrapperErr .error {
  z-index: 9;
  font-size: 50px;
  transition: all 1s;
}

.wrapperErr .back {
  position: relative;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 100px;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #fff;
  background: #373d60;
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.wrapperErr .back::after {
  position: absolute;
  width: 580px;
  height: 80px;
  content: '';
  border: 1px solid #fff6;
  border-radius: 50px;
}

.wrapperErr .back::before {
  position: absolute;
  width: 560px;
  height: 60px;
  content: '';
  border: 1px dashed #fff6;
  border-radius: 50px;
}

.wrapperErr #error {
  width: 100%;
  height: 500px;
}
</style>
~/utils/basic
