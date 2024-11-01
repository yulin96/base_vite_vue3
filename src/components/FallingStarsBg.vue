<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { cn } from '~/tools/utils'

const props = withDefaults(
  defineProps<{
    color?: string
    count?: number
    class?: string
  }>(),
  {
    color: '#FFF',
    count: 200,
  },
)

const starsCanvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const canvas = starsCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 将画布设置为全屏

  const resizeCanvas = () => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
  }

  window.addEventListener('resize', resizeCanvas)
  resizeCanvas() // 最初调用它以设置正确的大小

  const perspective = canvas.width / 2
  const stars: { x: number; y: number; z: number; speed: number }[] = []

  // 初始化星星

  for (let i = 0; i < props.count; i++) {
    stars.push({
      x: (Math.random() - 0.5) * 2 * canvas.width,
      y: (Math.random() - 0.5) * 2 * canvas.height,
      z: Math.random() * canvas.width,
      speed: Math.random() * 5 + 2, // 坠落效果的速度
    })
  }

  // 绘制带有锐线和模糊轨迹的星星的函数

  const drawStar = (star: { x: number; y: number; z: number; speed: number }) => {
    const scale = perspective / (perspective + star.z) // 3D透视比例尺

    const x2d = canvas.width / 2 + star.x * scale
    const y2d = canvas.height / 2 + star.y * scale
    const size = Math.max(scale * 3, 0.5) // 根据视角大小

    // 轨迹效果的上一个位置

    const prevScale = perspective / (perspective + star.z + star.speed * 15) // 更长的步道距离

    const xPrev = canvas.width / 2 + star.x * prevScale
    const yPrev = canvas.height / 2 + star.y * prevScale

    const rgb = hexToRgb()

    // 绘制模糊轨迹（较长，不透明度较低）

    ctx.save() // 保存当前上下文状态以便稍后恢复

    ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`
    ctx.lineWidth = size * 2.5 // 较粗的轨迹可产生模糊效果

    ctx.shadowBlur = 35 // 为轨迹添加模糊效果

    ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`
    ctx.beginPath()
    ctx.moveTo(x2d, y2d)
    ctx.lineTo(xPrev, yPrev) // 更长的路线

    ctx.stroke()
    ctx.restore() // 恢复上下文状态以消除主线的模糊

    // 画清晰的线（不模糊）

    ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`
    ctx.lineWidth = size // 线宽与星星大小相同

    ctx.beginPath()
    ctx.moveTo(x2d, y2d)
    ctx.lineTo(xPrev, yPrev) // 尖锐的痕迹

    ctx.stroke()

    // 绘制实际的星星（点）

    ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`
    ctx.beginPath()
    ctx.arc(x2d, y2d, size / 4, 0, Math.PI * 2) // 大小与宽度相匹配的点

    ctx.fill()
  }

  // 使星星动起来的函数

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height) // 清除每一帧的画布

    stars.forEach((star) => {
      drawStar(star)

      // 将星星移向屏幕（减少 z）

      star.z -= star.speed

      // 当星星到达观察者时重置星星 (z = 0)

      if (star.z <= 0) {
        star.z = canvas.width
        star.x = (Math.random() - 0.5) * 2 * canvas.width
        star.y = (Math.random() - 0.5) * 2 * canvas.height
      }
    })

    requestAnimationFrame(animate) // 继续动画
  }

  animate() // 开始动画
})

function hexToRgb() {
  let hex = props.color.replace(/^#/, '')

  // 如果十六进制代码为 3 个字符，则将其扩展为 6 个字符

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }

  // 从十六进制字符串中解析 r、g、b 值

  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255 // 提取红色成分

  const g = (bigint >> 8) & 255 // 提取绿色成分

  const b = bigint & 255 // 提取蓝色分量

  // 以空格分隔的字符串形式返回 RGB 值

  return {
    r,
    g,
    b,
  }
}
</script>

<template>
  <canvas ref="starsCanvas" :class="cn('absolute inset-0 h-full w-full', $props.class)"></canvas>
</template>
