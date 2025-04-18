import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import vitePluginDeployFtp from 'vite-plugin-deploy-ftp'
import vitePluginDeployOss from 'vite-plugin-deploy-oss'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import vitePluginMetaShare from 'vite-plugin-meta-share'
import vitePluginOrganize from 'vite-plugin-organize-resource'

import { VantResolver } from '@vant/auto-import-resolver'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'

import pxtorem from '@minko-fe/postcss-pxtorem'
import postcssPresetEnv from 'postcss-preset-env'
import tailwindcss from 'tailwindcss'

const splitDependencies: Record<string, string> = {
  gsap: 'gsap',
  html2canvas: 'html2canvas',
  lottie: 'lottie-web',
  zoomist: 'zoomist',
  dingtalk: 'dingtalk-jsapi',
  vueuse: '@vueuse/core',
}

const env = loadEnv('production', process.cwd())

export default defineConfig(({ command }) => ({
  plugins: [
    {
      name: 'build-check',
      apply: 'build',
      buildStart() {
        handleCheck()
      },
      closeBundle() {},
    },
    vitePluginMetaShare({
      enable: true,
      title: env.VITE_APP_SHARE_TITLE,
      description: env.VITE_APP_SHARE_DESC,
      link: env.VITE_APP_SHARE_LINK,
      image: env.VITE_APP_SHARE_IMGURL,
    }),
    ViteImageOptimizer({
      exclude: /\.(webp|svg)$/i,
      jpg: {
        quality: 92,
        progressive: true,
        mozjpeg: true,
      },
      png: {
        quality: 92,
        progressive: true,
        compressionLevel: 6,
        adaptiveFiltering: true,
        dither: 0.6,
      },
    }),
    VueRouter({
      dts: 'typings/typed-router.d.ts',
      importMode: 'sync',
    }),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('a-'),
        },
      },
    }),
    vueJsx(),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [VantResolver()],
      dts: './typings/components.d.ts',
      directoryAsNamespace: true,
    }),
    vitePluginDeployOss({
      open: env.VITE_OSS_ROOT_DIR === 'H5/zz/auto2/' ? false : true,
      accessKeyId: process.env.zAccessKeyId || '',
      accessKeySecret: process.env.zAccessKeySecret || '',
      bucket: process.env.zBucket,
      region: 'oss-cn-beijing',
      uploadDir: `${env.VITE_OSS_ROOT_DIR}`,
      skip: ['**/index.html', '**/pluginWebUpdateNotice/**'],
      overwrite: true,
      autoDelete: true,

      alias: `https://oss.eventnet.cn/`,
      // 修改打包后的资源路径
      configBase: `https://oss.eventnet.cn/${env.VITE_OSS_ROOT_DIR}`,
    }),
    vitePluginOrganize({
      config: {
        IMG_RESOURCES: ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'],
      },
    }),
    vitePluginDeployFtp({
      open: true,
      uploadPath: `${env.VITE_FTP_DIRNAME}`,
      // host: process.env.zQRFtpHost as string,
      // port: +(process.env.zQRFtpPort || 21),
      // user: process.env.zQRFtpUser as string,
      // password: process.env.zQRFtpPassword as string,
      // alias: `https://event1.cn/`,
      host: process.env.zH5FtpHost as string,
      port: +(process.env.zH5FtpPort || 21),
      user: process.env.zH5FtpUser as string,
      password: process.env.zH5FtpPassword as string,
      alias: `https://h5.eventnet.cn/`,
    }),
    visualizer(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: './',
  esbuild: {
    drop: command === 'serve' ? [] : env.VITE_DROP_CONSOLE == '1' ? ['console', 'debugger'] : [],
  },
  build: {
    assetsInlineLimit: 10240,
    assetsDir: 'assets',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
      },
      output: {
        // manualChunks(id) {
        //   if (id.includes('node_modules')) {
        //     for (const key in splitDependencies) {
        //       if (id.includes(splitDependencies[key])) return `chunks/${key}`
        //     }
        //   }
        // },
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
          browsers: ['ios >= 13', 'chrome >= 64'],
        }),
        pxtorem({
          rootValue: ({ file }: any) => (~file.indexOf('node_modules/vant') ? 5 : 10),
          propList: ['*'],
          selectorBlackList: ['.ignore', 'pc'],
          replace: true,
          minPixelValue: 1,
        }),
        // postcssPxToViewport({
        //   unitToConvert: 'px',
        //   viewportWidth: (file) => (~file.indexOf('node_modules/vant') ? 375 : 1920),
        //   unitPrecision: 5,
        //   propList: ['*'],
        //   viewportUnit: 'vw',
        //   fontViewportUnit: 'vw',
        //   selectorBlackList: ['ignore-'],
        //   minPixelValue: 1,
        //   mediaQuery: true,
        //   replace: true,
        //   exclude: [],
        //   include: [],
        //   landscape: false,
        //   landscapeUnit: 'vw',
        //   landscapeWidth: 1628,
        // }),
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
