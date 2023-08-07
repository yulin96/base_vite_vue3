<script setup lang="ts">
import * as faceapi from 'face-api.js'
const linkTo = inject('linkTo') as ILinkTo

const testReq = () => {
  window.location.reload()
}

async function loadModel() {
  await faceapi.nets.tinyFaceDetector.load('./models/tiny_face_detector_model-weights_manifest.json')
}
onBeforeMount(async () => {
  await loadModel()
})
const faceList = ref<any[]>([])
const testReq2 = async () => {
  // linkTo('home')
  console.log(faceapi.nets, faceapi)

  const image = document.querySelector('#test_img') as any
  console.log(image)

  const faces = await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions())
  console.log(faces)
  if (faces.length === 0) {
    return showToast({ message: '未获取到面部' })
  }
  faces.forEach((face) => {
    const { x, y, width, height } = face.box
    const score = face.score
    const imageWidth = face.imageWidth
    faceList.value.push({
      x: (x / imageWidth) * 100,
      y: (y / imageWidth) * 100,
      width: (width / imageWidth) * 100,
      height: (height / imageWidth) * 100,
      score: score,
    })
  })
}
</script>

<template>
  <div class="index">
    <div class="content">
      <div class="test_img">
        <img id="test_img" src="https://source.unsplash.com/512x512/?face,friends" alt="" crossorigin="anonymous" />
        <div
          v-for="item in faceList"
          :key="item"
          :style="{
            position: 'absolute',
            left: item.x + '%',
            top: item.y + '%',
            width: item.width + '%',
            height: item.height + '%',
            border: '2px solid red',
          }"></div>
      </div>
      <div @click="testReq" class="btn">刷新</div>
      <div @click="testReq2" class="btn">获取面部</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.index {
  .content {
    background: antiquewhite;

    .test_img {
      position: relative;
      width: 100%;

      img {
        width: 100%;
      }
    }

    .btn {
    }
  }
}
</style>
