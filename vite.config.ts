import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin'

import { visualizer } from 'rollup-plugin-visualizer'

import path from 'node:path'
const splitDependencies = ['gsap', 'html2canvas', 'lottie-web']

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ script: { defineModel: true } }),
    vueJsx(),
    Components({
      dirs: ['src/components'],
      extensions: ['vue', 'tsx', 'jsx'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx/, /\.jsx/],
      resolvers: [VantResolver()],
      dts: './components.d.ts',
    }),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: [
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
        'vue-i18n',
        {
          '@vueuse/integrations/useQRCode': ['useQRCode'],
          vant: [
            'showToast',
            'showFailToast',
            'showSuccessToast',
            'showLoadingToast',
            'closeToast',
            'showDialog',
            'showConfirmDialog',
            'closeDialog',
            'showActionSheet',
            'showPopup',
            'showPicker',
            'showDatetimePicker',
            'showArea',
            'showShareSheet',
            'showIm',
            'showImagePreview',
          ],
          gsap: ['gsap'],
        },
      ],
      dirs: ['./src/utils/**', './src/hooks/**', './src/public/**', './src/stores/**'],
      dts: './auto-imports.d.ts',
      vueTemplate: true,
      ignore: [],
    }),
    legacy({
      targets: ['defaults', 'not IE 11', '> 1%', 'ios >= 10'],
    }),
    visualizer({
      title: 'Dependency analysis',
    }),
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: './',
  build: {
    reportCompressedSize: false,
    minify: 'terser',
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
      },
      output: {
        chunkFileNames: 'assets/static/[name]-[hash].js',
        manualChunks(id) {
          for (const dependency of splitDependencies) if (id.includes(dependency)) return dependency
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3010,
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
        postcsspxtoviewport8plugin({
          unitToConvert: 'px',
          viewportWidth: (file) => (~file.indexOf('node_modules/vant') ? 375 : 750),
          unitPrecision: 5,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: [],
          minPixelValue: 1,
          mediaQuery: false,
          replace: true,
          exclude: [],
          landscape: false,
          landscapeUnit: 'vw',
          landscapeWidth: (file) => (~file.indexOf('node_modules/vant') ? 720 : 1440),
        }),
      ],
    },
  },
})
