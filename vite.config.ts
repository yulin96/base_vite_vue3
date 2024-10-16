import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig, loadEnv } from 'vite'

import { webUpdateNotice } from '@plugin-web-update-notification/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

import postcssPresetEnv from 'postcss-preset-env'
import pxtorem from 'postcss-pxtorem'
import tailwindcss from 'tailwindcss'

const splitDependencies = ['gsap', 'html2canvas', 'lottie-web', 'zoomist']

const env = loadEnv('production', process.cwd())

let propOssPath = './'
if (env.VITE_OSS_ROOT_DIRNAME !== '' && env.VITE_OSS_DIRNAME !== '') {
  propOssPath = `https://oss.eventnet.cn/${env.VITE_OSS_ROOT_DIRNAME}/${env.VITE_OSS_DIRNAME}/`
}

export default defineConfig(({ command }) => ({
  plugins: [
    {
      apply: 'build',
      buildStart() {
        handleCheck()
      },
      closeBundle() {},
    },
    ViteImageOptimizer({
      jpg: {
        quality: 90,
        progressive: true,
      },
      png: {
        quality: 90,
        compressionLevel: 9,
        adaptiveFiltering: true,
      },
    }),
    VueRouter({
      dts: 'typings/typed-router.d.ts',
      importMode: 'sync',
    }),
    vue({}),
    vueJsx(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: [
        'vue-router',
        'vue',
        'vue-i18n',
        {
          '@vueuse/integrations/useQRCode': ['useQRCode'],
          gsap: [['default', 'gsap']],
          vant: [
            'showLoadingToast',
            'showDialog',
            'showFailToast',
            'showNotify',
            'showConfirmDialog',
            'showImagePreview',
            'showSuccessToast',
          ],
          '@vueuse/core': [
            'useToggle',
            'useLocalStorage',
            'useDocumentVisibility',
            'useElementVisibility',
            'useUserMedia',
            'useMediaControls',
            'useWebSocket',
            'useVirtualList',
            'watchDebounced',
            'watchThrottled',
            'whenever',
            'useArrayDifference',
            'useDateFormat',
            'useNow',
            'useTimeoutPoll',
            'useOffsetPagination',
            'createReusableTemplate',
            'onClickOutside',
            'useMagicKeys',
          ],
          'vue-sonner': ['toast'],
        },
      ],
      dirs: ['./src/hooks/**', './src/router/**', './src/stores/**'],
      dts: './typings/auto-imports.d.ts',
      vueTemplate: true,
      ignore: ['reactify', 'reactifyObject', 'router'],
    }),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [VantResolver()],
      dts: './typings/components.d.ts',
      directoryAsNamespace: true,
    }),
    // legacy({
    //   targets: ['ios >= 11', 'chrome >= 64', 'android >= 9'],
    //   modernPolyfills: true,
    // }),
    webUpdateNotice({
      hiddenDefaultNotification: true,
      logVersion: (version) => {
        const randomColor =
          'rgb(' +
          Math.floor(Math.random() * 256) +
          ',' +
          Math.floor(Math.random() * 256) +
          ',' +
          Math.floor(Math.random() * 256) +
          ')'

        console.log(
          `🦄 ☕ %c version: ${version}
%c        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`,
          `color:${randomColor};font-weight:600`,
          `color:${randomColor}`,
        )
      },
      injectFileBase: getNoticeUrl(),
      versionType: 'build_timestamp',
    }),
    visualizer(),
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: command === 'serve' ? './' : propOssPath,
  esbuild: {
    drop: command === 'serve' ? [] : env.VITE_DROP_CONSOLE == '1' ? ['console', 'debugger'] : [],
  },
  build: {
    assetsInlineLimit: 10240,
    assetsDir: 'assets',
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks(id) {
          for (const dependency of splitDependencies) if (id.includes(dependency)) return dependency
          return
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3010,
    hmr: true,
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        postcssPresetEnv({
          browsers: ['ios >= 11', 'chrome >= 64'],
        }),
        pxtorem({
          rootValue({ file }: any) {
            return file.indexOf('vant') !== -1 ? 5 : 10
          }, // 基准值，可以根据设计稿设置
          propList: ['*'], // 哪些属性需要转换，['*'] 表示所有属性
          selectorBlackList: ['.ignore', 'pc'], // 忽略转换的选择器
          replace: true, // 是否替换属性中的 px
          mediaQuery: false, // 是否允许在媒体查询中转换 px
          minPixelValue: 1, // 最小像素值，小于该值的不会被转换
        }),
      ],
    },
  },
}))

function handleCheck() {
  const {
    VITE_APP_LOCALSTORAGE_NAME,
    VITE_APP_API_URL,
    VITE_APP_TITLE,
    VITE_APP_HM_BAIDU,
    VITE_APP_SHARE_TITLE,
    VITE_APP_SHARE_DESC,
    VITE_APP_SHARE_LINK,
    VITE_APP_SHARE_IMGURL,
  } = env

  import('chalk').then(({ default: chalk }) => {
    const { bgMagentaBright, red, green } = chalk

    function logTips(name: string, nameSuccess: string, checkName: string) {
      console.log(!checkName ? red(name) : green(nameSuccess) + green.underline.bold(checkName))
    }

    console.log(bgMagentaBright('Tips:'))
    logTips('网站标题未定义', '网站标题', VITE_APP_TITLE)
    logTips('接口地址未定义', '接口地址', VITE_APP_API_URL)
    logTips('本地存储名称未定义', '本地存储名称', VITE_APP_LOCALSTORAGE_NAME)
    logTips('百度统计ID未定义', '百度统计ID', VITE_APP_HM_BAIDU)
    logTips('微信分享标题未定义', '微信分享标题', VITE_APP_SHARE_TITLE)
    logTips('微信分享描述未定义', '微信分享描述', VITE_APP_SHARE_DESC)
    logTips('微信分享链接未定义', '微信分享链接', VITE_APP_SHARE_LINK)
    logTips('微信分享图片未定义', '微信分享图片', VITE_APP_SHARE_IMGURL)
  })
}

function getNoticeUrl() {
  const baseURL = env.VITE_APP_SHARE_LINK
  if (!baseURL) return './'
  const _url = baseURL.substring(0, baseURL.indexOf('#') === -1 ? baseURL.length : baseURL.indexOf('#'))
  return _url.substring(0, _url.lastIndexOf('/') + 1)
}
