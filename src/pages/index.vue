<script setup lang="ts">
import { animate, inView, scroll } from 'motion'
import { onMounted } from 'vue'

/*  */
onMounted(() => {
  scroll(animate('.box10', { x: [100, 0], opacity: [0.1, 1] }), {
    container: document.querySelector('.index') as HTMLElement,
    offset: [0, 0.4],
  })

  scroll(
    animate('.move_box', {
      transform: ['none', `translateX(-500vw)`],
    }),
    {
      target: document.querySelector('.move_b2') as HTMLElement,
      container: document.querySelector('.index') as HTMLElement,
    },
  )

  inView(
    '.box7',
    (entry) => {
      console.log(entry)
      const animation = animate(entry, { x: [-200, 0], opacity: [0.1, 1] })
      return () => {
        animation.stop()
      }
    },
    {
      margin: '100px 0px 0px 0px',
    },
  )
})
</script>

<template>
  <section class="index">
    <main class="content flex flex-col items-center">
      <div
        v-for="item in 10"
        :key="item"
        :class="`box${item}`"
        class="center my-30 size-200 rounded-12 bg-sky-500 text-white"
      >
        {{ item }}
      </div>
      <div class="move_b2 h-[500vh] w-full">
        <div class="move_box sticky top-0 flex h-[100vh] w-full">
          <div
            v-for="item in 6"
            :key="item"
            class="center h-[100vh] w-full flex-[0_0_auto] border bg-red-200"
          >
            {{ item }}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum earum eveniet nisi aliquam
            est distinctio adipisci, ut unde voluptatum natus sed culpa dolorem similique rem, vitae
            cum. Minima, provident molestias?
          </div>
        </div>
      </div>
      <div class="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. In dicta maxime, at error facilis
        exercitationem deleniti animi autem cumque nesciunt a itaque sint praesentium similique
        labore vel, consequuntur quos dolore?
      </div>
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>
