<script setup lang="ts">
import { LuckyGrid } from 'lucky-canvas'

onMounted(() => {
  const myLucky = new LuckyGrid('#my-lucky' as any, {
    width: '82vw',
    height: '82vw',
    blocks: [{ padding: '10px' }],
    prizes: [
      {
        x: 0, //格子的x轴坐标
        y: 0, //格子的y轴坐标
        imgs: [
          {
            src: 'https://oss.eventnet.cn/H5/zz/test/l1.png', //图片地址
            width: '100%', //图片宽度
            height: '100%', //图片高度
            activeSrc: 'https://oss.eventnet.cn/H5/zz/test/l1_s.png', //图片选中后的地址
          },
        ],
      },
      {
        x: 1,
        y: 0,
        imgs: [
          {
            src: 'https://oss.eventnet.cn/H5/zz/test/l2.png',
            width: '100%',
            height: '100%',
            activeSrc: 'https://oss.eventnet.cn/H5/zz/test/l2_s.png',
          },
        ],
      },
      {
        x: 2,
        y: 0,
        imgs: [
          {
            src: 'https://oss.eventnet.cn/H5/zz/test/l3.png',
            width: '100%',
            height: '100%',
            activeSrc: 'https://oss.eventnet.cn/H5/zz/test/l3_s.png',
          },
        ],
      },
      {
        x: 2,
        y: 1,
        imgs: [
          {
            src: 'https://oss.eventnet.cn/H5/zz/test/thanks.png',
            width: '100%',
            height: '100%',
            activeSrc: 'https://oss.eventnet.cn/H5/zz/test/thanks_s.png',
          },
        ],
      },
      {
        x: 2,
        y: 2,
        imgs: [
          {
            src: 'https://oss.eventnet.cn/H5/zz/test/l4.png',
            width: '100%',
            height: '100%',
            activeSrc: 'https://oss.eventnet.cn/H5/zz/test/l4_s.png',
          },
        ],
      },
      {
        x: 1,
        y: 2,
        imgs: [
          {
            src: 'https://oss.eventnet.cn/H5/zz/test/l5.png',
            width: '100%',
            height: '100%',
            activeSrc: 'https://oss.eventnet.cn/H5/zz/test/l5_s.png',
          },
        ],
      },
      {
        x: 0,
        y: 2,
        imgs: [
          {
            src: 'https://oss.eventnet.cn/H5/zz/test/thanks.png',
            width: '100%',
            height: '100%',
            activeSrc: 'https://oss.eventnet.cn/H5/zz/test/thanks_s.png',
          },
        ],
      },
      {
        x: 0,
        y: 1,
        imgs: [
          {
            src: 'https://oss.eventnet.cn/H5/zz/test/l6.png',
            width: '100%',
            height: '100%',
            activeSrc: 'https://oss.eventnet.cn/H5/zz/test/l6_s.png',
          },
        ],
      },
    ],
    activeStyle: { background: 'transparent' },
    buttons: [
      {
        x: 1,
        y: 1,
        background: 'rgba(0,0,0,0)',
        imgs: [
          {
            src: 'https://oss.eventnet.cn/H5/zz/test/start.png',
            width: '100%',
            height: '100%',
          },
        ],
      },
    ],
    defaultConfig: {
      gutter: 6,
      speed: 20,
      accelerationTime: 1000, // 加速时间
      decelerationTime: 1500, // 减速时间
    },
    start: function () {
      // 开始游戏
      myLucky.play()
      // 使用定时器模拟接口
      setTimeout(() => {
        // 结束游戏, 并抽第几号奖品
        myLucky.stop(3)
      }, 1000)
    },
    end: (gift) => {
      console.log(gift)
    },
  })
})
</script>

<template>
  <div class="wrapper">
    <div class="content">
      <div class="lottery_box">
        <div id="my-lucky"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  .content {
    .lottery_box {
      width: 655px;
      height: 823px;
      padding-top: 60px;
      margin: 200px auto;
      background: url('https://oss.eventnet.cn/H5/zz/test/lottery_bg.png') center/100% 100% no-repeat;

      #my-lucky {
        width: 82vw;
        height: 82vw;
        margin: 0 auto;
      }
    }
  }
}
</style>
