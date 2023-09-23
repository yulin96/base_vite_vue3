<script setup lang="ts">
const { post: post_giftList } = useLock()
const scan = () => {
  WxScanQRCode().then((res) => {
    const { resultStr } = res

    post_giftList('giftList', { signcode: resultStr }).then(async (res) => {
      if (res.code == 1) {
        userInfo.value.phone = res.data.mobile
        userInfo.value.num = res.data.number
        userInfo.value.signCode = resultStr

        await nextTick()
        userInfo.value.show = true
      } else if (res.code == 8506) {
        showDialog({ message: '该礼物已被核销', title: '温馨提示' })
      } else {
        showToast({ message: res.message })
      }
    })
  })
}

const { post: post_writeOff } = useLock()
const checkIn = () => {
  const { signCode } = userInfo.value
  post_writeOff('writeOff', { signcode: signCode }).then((res) => {
    if (res.code == 1) {
      showDialog({ message: '核销成功', title: '温馨提示' })
    } else if (res.code == 8506) {
      showDialog({ message: '该礼物已被核销', title: '温馨提示' })
    } else {
      showToast({ message: res.message })
    }
  })
}

const userInfo = ref({
  show: false,
  phone: '',
  num: '',
  signCode: '',
})
</script>

<template>
  <div class="index">
    <div class="content flex flex-col items-center pt-30">
      <div class="w-486 h-61 relative">
        <img class="w-486" src="https://oss.eventnet.cn/H5/zz/hephoom/logo.png" alt="" />
      </div>
      <!--  -->
      <div class="mt-60 relative">
        <img class="w-507" src="https://oss.eventnet.cn/H5/zz/hephoom/title1.png" alt="" />
      </div>
      <div class="relative">
        <img class="w-484" src="https://oss.eventnet.cn/H5/zz/hephoom/title2.png" alt="" />
      </div>
      <!--  -->
      <div class="flex flex-col items-center mt-[100px]" @click="scan">
        <svg class="icon w-200" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3997">
          <path
            d="M136 384h56c4.4 0 8-3.6 8-8V200h176c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H196c-37.6 0-68 30.4-68 68v180c0 4.4 3.6 8 8 8zM648 200h176v176c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V196c0-37.6-30.4-68-68-68H648c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zM376 824H200V648c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v180c0 37.6 30.4 68 68 68h180c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM888 640h-56c-4.4 0-8 3.6-8 8v176H648c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h180c37.6 0 68-30.4 68-68V648c0-4.4-3.6-8-8-8zM904 476H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"
            p-id="3998"
            fill="#ffffff"></path>
        </svg>
        <div class="mt-30 text-40" style="color: white">扫码核销</div>
      </div>
    </div>
    <van-popup
      v-model:show="userInfo.show"
      class=""
      style="width: 100%; border-radius: 20px; background: #f7f8fa; padding: 50px 0">
      <div class="fixthis flex flex-col items-center">
        <van-cell-group inset>
          <van-field label="手机号：" :model-value="userInfo.phone" readonly label-align="right" />
          <van-field label="礼物数量：" :model-value="userInfo.num" readonly label-align="right" class="ttInpt" />
        </van-cell-group>
        <div @click="checkIn" class="btn">核销</div>
      </div>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.fixthis {
  .btn {
    margin-top: 80px;
    width: 300px;
    height: 90px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0d7eff;
    color: #fff;
  }
}
</style>
