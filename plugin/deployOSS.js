//@ts-check
import oss from 'ali-oss'
import chalk from 'chalk'
import { globSync } from 'glob'
import ora from 'ora'
import { normalizePath } from 'vite'

const skipDir = ['pluginWebUpdateNotice']
const skipFileName = ['index.html', 'clear.html', 'pc.html', 'scan.html']

/**
 *
 * @returns {import('vite').Plugin}
 */
export default function resourceOrganization(option = {}) {
  const {
    region,
    accessKeyId,
    accessKeySecret,
    bucket,
    skipDir,
    skipFileName,
    uploadDir = '/',
    isOver = false,
  } = option

  if (!region || !accessKeyId || !accessKeySecret || !bucket || !uploadDir) {
    return {
      name: 'vite-plugin-deploy-oss',
      apply: 'build',
      closeBundle() {
        console.log(chalk.bgYellowBright('未上传OSS, 获取权限失败'))
      },
    }
  }

  let ourDir = 'dist'
  return {
    name: 'vite-plugin-deploy-oss',
    apply: 'build',
    enforce: 'post',
    config(config) {
      config.base = 'https://h5.eventnet.cn/xiaomi/'
      ourDir = config.build?.outDir || 'dist'
      return config
    },
    closeBundle() {
      console.log(chalk.green('开始上传OSS >>> '))
      const client = new oss({ region, accessKeyId, accessKeySecret, secure: true, bucket })

      const files = globSync(ourDir + '/**/*', {
        nodir: true,
        ignore: [
          '**/pluginWebUpdateNotice/**',
          '**/index.html',
          '**/clear.html',
          '**/pc.html',
          '**/scan.html',
        ],
      })

      const process = ora('上传中...').start()

      files.forEach(async (file) => {
        const filePath = normalizePath(file)
        console.log(filePath)
      })
    },
  }
}
