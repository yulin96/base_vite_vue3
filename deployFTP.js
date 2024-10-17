//@ts-check
import { select } from '@inquirer/prompts'
import archiver from 'archiver'
import { Client } from 'basic-ftp'
import chalk from 'chalk'
import dayjs from 'dayjs'
import dotenv from 'dotenv'
import fs from 'fs'
import ora from 'ora'
import path from 'path'
import { env, exit } from 'process'

dotenv.config()

const { green, red, yellow } = chalk

const remoteDir = env.VITE_FTP_DIRNAME

if (!remoteDir || remoteDir === '/') {
  console.log(red('请在.env文件中配置VITE_FTP_DIRNAME后自动上传'))
  exit()
}

const answer = await select({ message: '是否上传FTP', choices: ['是', '否'], default: '是' })
if (answer === '否') exit()

const spinner = ora('准备自动上传，创建连接中...').start()
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
        timeout: 60000,
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
      const zipSpinner = ora(`创建备份文件中 ${yellow(`==> 目录：${remoteDir}`)}`).start()
      const zipName = `backup_${dayjs().format('YYYYMMDD_HHmmss')}.zip`

      const localDir = `./__temp/zip`
      const zipFilePath = `./__temp/${zipName}`

      if (!fs.existsSync(localDir)) {
        fs.mkdirSync(localDir, { recursive: true })
      }
      await client.downloadToDir(localDir, remoteDir)
      zipSpinner.text = `下载远程文件成功 ${yellow(`==> 目录：${remoteDir}`)}`

      fs.readdirSync(localDir).forEach((i) => {
        if (i.startsWith('backup_') && i.endsWith('.zip')) {
          fs.rmSync(path.join(localDir, i))
        }
      })

      const output = fs.createWriteStream(zipFilePath)
      const archive = archiver('zip', {
        zlib: { level: 9 },
      })

      output.on('close', function () {
        // console.log(`压缩文件已创建，总共压缩了 ${archive.pointer()} 字节.`)
      })

      archive.on('error', function (err) {
        zipSpinner.fail('压缩失败')
        throw err
      })

      archive.pipe(output)
      archive.directory(localDir, false)
      await archive.finalize()
      zipSpinner.text = `压缩完成, 准备上传 ${yellow(`==> 目录：${remoteDir}/${zipName}`)}`

      await client.uploadFrom(zipFilePath, `${remoteDir}/${zipName}`)
      zipSpinner.succeed(`备份成功 ${green(`==> 目录：${remoteDir}/${zipName}`)}`)

      fs.rmSync(`./__temp`, { recursive: true })
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

clientAndUpload()
