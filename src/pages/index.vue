<script setup lang="ts">
import imgBG from '~/assets/imgs/girl.jpg'

const puzzleList = ref([1, 2, 3, 4, 5, 6])

/*  */
onMounted(() => {
  const puzzleBox = document.querySelector('#puzzle-box')! as HTMLDivElement
  const puzzleBoxWidth = puzzleBox.clientWidth

  const img = new Image()
  img.onload = () => {
    const needHeight = (img.height / img.width) * puzzleBoxWidth
    puzzleBox.style.height = `${needHeight}px`
  }
  img.src = imgBG
})
</script>

<template>
  <section class="index">
    <main class="content pt-90">
      <div id="puzzle-box">
        <div v-for="item in puzzleList" :key="item" :class="`item${item}`"></div>
      </div>
    </main>
  </section>
</template>

<style>
#puzzle-box {
  width: 700px;
  position: relative;
}

#puzzle-box > div {
  background-image: url('../assets/imgs/girl.jpg');
  background-size: 200% 300%;
  width: 50%;
  height: 33.3%;
  position: absolute;
  top: 0;
  left: 0;
  border: 0.5px solid rgb(72, 72, 182);
}

#puzzle-box > .item1 {
  background-position: 0% 0%;
}

#puzzle-box > .item2 {
  background-position: 100% 0%;
}

#puzzle-box > .item3 {
  background-position: 0% 50%;
}

#puzzle-box > .item4 {
  background-position: 100% 50%;
}

#puzzle-box > .item5 {
  background-position: 0% 100%;
}

#puzzle-box > .item6 {
  background-position: 100% 100%;
}
</style>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
