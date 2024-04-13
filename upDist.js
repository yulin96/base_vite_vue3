import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import oss from 'ali-oss'
import chalk from 'chalk'
import { readdirSync, rmdirSync } from 'fs'
import { join } from 'path'
import CryptoJS from 'crypto-js'

dotenv.config()

//需要跳过的文件
const skipDir = ['pluginWebUpdateNotice']
const skipFileName = ['index.html', 'clear.html', 'pc.html', 'scan.html']

const rootName = process.env.VITE_OSS_ROOT_DIRNAME
const uploadDirName = process.env.VITE_OSS_DIRNAME

if (!rootName || !uploadDirName) {
  console.log(chalk.bgRed('未上传OSS'))
  console.log(chalk.bgYellow('如需上传，请在.env文件中配置VITE_OSS_DIRNAME和VITE_OSS_ROOT_DIRNAME'))
  process.exit()
}

const accessKeyId = process.env.zAccessKeyId
const accessKeySecret = process.env.zAccessKeySecret
const bucket = process.env.zBucket

if (!accessKeyId || !accessKeySecret || !bucket) {
  console.log(chalk.bgRed('未上传OSS'), chalk.bgYellow('获取权限失败'))
  exit()
}

const client = new oss({ region: 'oss-cn-beijing', accessKeyId, accessKeySecret, secure: true, bucket })

const localDirName = 'dist'
const ossDirName = `${rootName}/${uploadDirName}`

const upFileList = []
putDir(localDirName, ossDirName)
if (upFileList.length === 0) {
  console.log('没有需要上传的文件')
  exit()
}

console.log(`${chalk.bgRed(localDirName)}  >>>  ${chalk.bgGreen(ossDirName)}`)

let isSizeError = false
for (const item of upFileList) {
  await putOSS(...item)
}
console.log(isSizeError ? '🎲 : 存在大于500k文件，建议缩小' : '✅')

removeEmptyDirectories('./dist')

function putDir(localDir, ossDir) {
  try {
    const filePath = path.resolve(import.meta.dirname, localDir)
    const docs = fs.readdirSync(filePath)

    docs.forEach((doc) => {
      const _src = `${filePath}/${doc}`
      const _dist = `${ossDir}/${doc}`
      const st = fs.statSync(_src)
      if (st.isFile() && doc !== '.DS_Store') {
        if (!skipFileName.includes(doc)) {
          upFileList.push([_src, _dist, st.size, path.extname(_src)])
        }
      } else if (st.isDirectory()) {
        if (!skipDir.includes(doc)) putDir(_src, _dist)
      }
    })
  } catch (e) {
    console.log(e)
  }
}

async function putOSS(local, oss, size, fileType) {
  let isOver = false
  try {
    await client.head(oss)
    isOver = true
  } catch (error) {
    isOver = false
  }
  const result = await client.put(oss, path.normalize(local), {
    timeout: 600000,
    headers: {
      'x-oss-storage-class': 'Standard',
      'x-oss-object-acl': 'default',
      'Cache-Control': 'no-cache',
      // 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
      'x-oss-forbid-overwrite': 'false',
    },
  })

  if (result.res.status === 200) {
    const sizeKb = (size / 1024).toFixed(2)
    if (sizeKb > 500) isSizeError = true
    const status = sizeKb > 500 ? 'bgRed' : sizeKb > 200 ? 'bgYellow' : 'green'
    console.log(
      `【${fileType.split('.')[1]}】` +
        chalk[status](`【${sizeKb}kb】`) +
        (isOver ? '上传成功(覆盖)：' : '上传成功：') +
        'https://oss.eventnet.cn/' +
        oss,
    )
    fs.unlinkSync(local)
  }
}

function removeEmptyDirectories(directory) {
  readdirSync(directory, { withFileTypes: true }).forEach((dirent) => {
    const absolutePath = join(directory, dirent.name)
    if (dirent.isDirectory()) {
      removeEmptyDirectories(absolutePath)
      if (readdirSync(absolutePath).length === 0) {
        rmdirSync(absolutePath)
      }
    }
  })
}

function decrypt(text, keyStr, ivStr) {
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const iv = CryptoJS.enc.Utf8.parse(ivStr)
  try {
    const decrypted = JSON.parse(CryptoJS.AES.decrypt(text, key, { iv }).toString(CryptoJS.enc.Utf8))
    return decrypted
  } catch (error) {
    return null
  }
}
