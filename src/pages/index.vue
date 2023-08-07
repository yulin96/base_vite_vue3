<script setup lang="ts">
import * as faceapi from 'face-api.js'

const loadWeight = async () => {
  await faceapi.nets.ssdMobilenetv1.load('./models/ssd_mobilenetv1_model-weights_manifest.json')
  await faceapi.nets.faceLandmark68Net.load('./models/face_landmark_68_model-weights_manifest.json')
  console.log('模型加载完成')
}

const linkTo = inject('linkTo') as ILinkTo

const { stream, start } = useUserMedia({
  constraints: {
    audio: false,
    video: {
      facingMode: 'user',
    },
  },
})

const video = ref<any>(null)
const loadVideo = (el: any) => {
  video.value.width = 290
  video.value.height = (el.target.videoHeight / el.target.videoWidth) * 290
}
watchEffect(() => {
  if (!video || !stream.value) return
  video.value.srcObject = stream.value
})

const positions = ref<any[]>([])

// setInterval(async () => {
//   if (stream.value) {
//     const result = await faceapi.detectSingleFace(video.value, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks()
//     if (!result) return
//     const landmarks = result.landmarks

//     const canvas = document.getElementById('canvas') as HTMLCanvasElement
//     const detectionsWithLandmarksForSize = faceapi.resizeResults(landmarks, {
//       width: landmarks.imageWidth,
//       height: landmarks.imageHeight,
//     })
//     canvas.width = landmarks.imageWidth
//     canvas.height = landmarks.imageHeight
//     faceapi.draw.drawFaceLandmarks(canvas, detectionsWithLandmarksForSize)
//   }
// }, 100)

const animate = async () => {
  requestAnimationFrame(animate)
  if (stream.value) {
    const result = await faceapi.detectSingleFace(video.value, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks()
    if (!result) return
    const landmarks = result.landmarks

    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    const detectionsWithLandmarksForSize = faceapi.resizeResults(landmarks, {
      width: landmarks.imageWidth,
      height: landmarks.imageHeight,
    })
    // draw them into a canvas
    canvas.width = landmarks.imageWidth
    canvas.height = landmarks.imageHeight
    // faceapi.drawLandmarks(canvas, detectionsWithLandmarks, { drawLines: true })
    faceapi.draw.drawFaceLandmarks(canvas, detectionsWithLandmarksForSize)
    // const leftEye = landmarks.getLeftEye()
    // const rightEye = landmarks.getRightEye()
    // let leftEyeSumPoint = leftEye.reduce((prev, cur) => ({ x: prev.x + cur.x, y: prev.y + cur.y }), { x: 0, y: 0 })
    // let rightEyeSumPoint = rightEye.reduce((prev, cur) => ({ x: prev.x + cur.x, y: prev.y + cur.y }), { x: 0, y: 0 })
    // let leftEyeAvgPoint = {
    //   x: leftEyeSumPoint.x / leftEye.length / window.devicePixelRatio,
    //   y: leftEyeSumPoint.y / leftEye.length / window.devicePixelRatio,
    // }
    // let rightEyeAvgPoint = {
    //   x: rightEyeSumPoint.x / leftEye.length / window.devicePixelRatio,
    //   y: rightEyeSumPoint.y / leftEye.length / window.devicePixelRatio,
    // }
    // positions.value = [leftEyeAvgPoint, rightEyeAvgPoint]
  }
}

requestAnimationFrame(animate)

onMounted(async () => {
  start()
  await loadWeight()
})
</script>

<template>
  <div class="home" @click="() => start()">
    <div class="content">
      <div class="video_box">
        <video
          ref="video"
          @loadedmetadata="loadVideo"
          class="video"
          playsinline
          autoplay
          muted
          crossorigin="anonymous"></video>
      </div>
      <canvas id="canvas"></canvas>
      <div class="tFix">
        <div
          class="pin"
          v-for="item in positions"
          :key="item.x"
          :style="{ position: 'absolute', left: item.x + 'px' }"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  .content {
    .video_box {
      position: relative;
      transform: rotateY(180deg);
    }

    #canvas {
      position: relative;
      left: 50%;
      transform: translateX(-50%) rotateY(180deg);
    }

    .video {
      width: 100%;
      object-fit: cover;
    }

    .tFix {
      position: relative;
      transform: rotateY(180deg);
    }

    .pin {
      top: 100px;
      width: 30px;
      height: 10px;
      background: red;
    }
  }
}
</style>
