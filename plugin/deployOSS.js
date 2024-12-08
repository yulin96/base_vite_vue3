//@ts-check
import oss from 'ali-oss'
import chalk from 'chalk'
import deleteEmpty from 'delete-empty'
import { globSync } from 'glob'
import { unlinkSync } from 'node:fs'
import path from 'node:path'
import { normalizePath } from 'vite'

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
    skipDir = ['pluginWebUpdateNotice'],
    skipFileName = ['index.html', 'clear.html', 'pc.html', 'scan.html'],
    uploadDir = '/',
    overwrite = false,
    alias,
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

  let outDir = 'dist'
  return {
    name: 'vite-plugin-deploy-oss',
    apply: 'build',
    enforce: 'post',
    config(config) {
      config.base = `https://oss.eventnet.cn/${uploadDir}/`
      outDir = config.build?.outDir || 'dist'
      return config
    },
    async closeBundle() {
      console.log(chalk.green('开始上传OSS >>> '))
      const client = new oss({ region, accessKeyId, accessKeySecret, secure: true, bucket })

      const files = globSync(outDir + '/**/*', {
        nodir: true,
        ignore: [...skipDir.map((i) => `**/${i}/**`), ...skipFileName.map((i) => `**/${i}`)],
      })

      for (const file of files) {
        const filePath = normalizePath(file)
        const remoteURL = filePath.replace('dist', `${uploadDir}`)

        const result = await client.put(remoteURL, filePath, {
          timeout: 600000,
          headers: {
            'x-oss-storage-class': 'Standard',
            'x-oss-object-acl': 'default',
            'Cache-Control': 'no-cache',
            'x-oss-forbid-overwrite': overwrite ? 'true' : 'false',
          },
        })
        if (result.res.status === 200) {
          console.log(chalk.green('上传成功 >>> '), alias ? alias + remoteURL : result.url)
          unlinkSync(filePath)
        }
      }

      deleteEmpty(path.resolve(outDir))
    },
  }
}
