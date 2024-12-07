//@ts-check
import oss from 'ali-oss'
import chalk from 'chalk'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { exit } from 'process'

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

const client = new oss({
  region: 'oss-cn-beijing',
  accessKeyId,
  accessKeySecret,
  secure: true,
  bucket,
})

const localDirName = 'dist'
const ossDirName = `${rootName}/${uploadDirName}`

const imgs = []
const upFileList = []
putDir(localDirName, ossDirName)
fs.writeFileSync(
  './dist/imgResources.js',
  imgs.length ? `window.IMG_RESOURCES = ['${imgs.join("','")}']` : 'window.IMG_RESOURCES = []',
)

if (upFileList.length === 0) {
  console.log('没有需要上传的文件')
  exit()
}

console.log(`${chalk.bgRed(localDirName)}  >>>  ${chalk.bgGreen(ossDirName)}`)

let isSizeError = false
for (const item of upFileList) {
  // await putOSS(...item)
  console.log(item)
}
console.log(isSizeError ? '🎲 : 存在大于500k文件，建议缩小' : '✅')

removeEmptyDirs('./dist')

function putDir(localDir, ossDir) {
  try {
    const filePath = path.resolve(import.meta.dirname, localDir)
    const docs = fs.readdirSync(filePath)

    docs.forEach((doc) => {
      const _src = `${filePath}/${doc}`
      const _dist = `${ossDir}/${doc}`
      const st = fs.statSync(_src)
      if (st.isFile() && doc !== '.DS_Store') {
        const fileType = path.extname(_src).replace('.', '')
        if (['jpg', 'jpeg', 'png', 'webp'].includes(fileType)) {
          imgs.push(`https://oss.eventnet.cn/${_dist}`)
        }

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
    const sizeKb = +(size / 1024).toFixed(2)
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

function removeEmptyDirs(dir) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      removeEmptyDirs(fullPath)
      if (fs.readdirSync(fullPath).length === 0) {
        fs.rmdirSync(fullPath)
      }
    }
  })
}
