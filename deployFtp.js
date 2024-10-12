//@ts-check
import { select } from '@inquirer/prompts'
import { Client } from 'basic-ftp'
import chalk from 'chalk'
import dotenv from 'dotenv'
import ora from 'ora'
import path from 'path'
import { env, exit } from 'process'
import { PassThrough } from 'stream'

dotenv.config()

const { green, red } = chalk

const remoteDir = '/t/5'

const spinner = ora('创建连接中...').start()
async function clientAndUpload() {
  try {
    const zH5FtpHost = env.zH5FtpHost
    const zH5FtpPort = env.zH5FtpPort
    const zH5FtpUser = env.zH5FtpUser
    const zH5FtpPassword = env.zH5FtpPassword

    if (!zH5FtpHost || !zH5FtpPort || !zH5FtpUser || !zH5FtpPassword || !remoteDir) {
      console.log(red('未上传FTP'), red('获取权限失败'))
      exit()
    }

    const client = new Client()
    client.ftp.verbose = false

    await client.access({
      host: zH5FtpHost,
      port: +zH5FtpPort,
      user: zH5FtpUser,
      password: zH5FtpPassword,
      secure: true,
      secureOptions: {
        rejectUnauthorized: false,
      },
    })

    spinner.color = 'blue'
    spinner.text = '连接成功'

    await client.ensureDir(remoteDir)

    spinner.color = 'magenta'
    spinner.text = `打开目录成功 ==> 目录：${remoteDir}`

    const fileList = await client.list(remoteDir)

    spinner.succeed(`已连接 ${green(`==> 目录：${remoteDir}`)}`)

    if (fileList.length) {
      const answer = await select({
        message: '上传目录非空目录，是否继续上传',
        choices: ['是', '否'],
        default: '否',
      })
      if (answer === '否') exit()
    }
    const upSpinner = ora('上传中...').start()
    await client.uploadFromDir('dist', remoteDir)
    upSpinner.succeed('上传成功')
    exit()
  } catch (error) {
    console.log(red(error.toString()))
    spinner.fail('上传失败')
    exit()
  }
}

// 递归遍历远程目录并将文件和文件夹添加到压缩包中
/**
 *
 * @param {*} client
 * @param {*} archive
 * @param {*} currentRemoteDir
 * @param {*} currentLocalDir
 */
async function appendRemoteDirectoryToArchive(client, archive, currentRemoteDir, currentLocalDir) {
  const fileList = await client.list()

  for (const file of fileList) {
    const remoteFilePath = path.join(currentRemoteDir, file.name)
    const localFilePath = path.join(currentLocalDir, file.name)

    if (file.isDirectory) {
      await appendRemoteDirectoryToArchive(client, archive, remoteFilePath, localFilePath)
    } else if (file.isFile) {
      const passThrough = new PassThrough()

      const downloadPromise = client.downloadTo(passThrough, remoteFilePath)

      archive.append(passThrough, { name: localFilePath })

      await downloadPromise
    }
  }

  // 返回上级目录
  await client.cdup()
}

clientAndUpload()
