//@ts-check
import { select } from '@inquirer/prompts'
import archiver from 'archiver'
import { Client } from 'basic-ftp'
import chalk from 'chalk'
import dayjs from 'dayjs'
import fs from 'node:fs'
import path from 'node:path'
import ora from 'ora'

/**
 *
 * @returns {import('vite').Plugin}
 */
export default function deployFTP(option = {}) {
  const { host, port, user, password, dir, alias = '' } = option

  let outDir = 'dist'

  return {
    name: 'vite-plugin-deploy-ftp',
    apply: 'build',
    enforce: 'post',
    config(config) {
      outDir = config.build?.outDir || 'dist'
      return config
    },
    async closeBundle() {
      if (!host || !port || !user || !password || !dir) return
      const ftpUploadChoice = await select({
        message: '是否上传FTP',
        choices: ['是', '否'],
        default: '是',
      })
      if (ftpUploadChoice === '否') return
      const uploadSpinner = ora('准备自动上传，创建连接中...').start()
      const client = new Client()
      client.ftp.verbose = false
      await client.access({
        host,
        port,
        user,
        password,
        secure: true,
        secureOptions: { rejectUnauthorized: false, timeout: 60000 },
      })
      uploadSpinner.color = 'blue'
      uploadSpinner.text = '连接成功'
      const fileList = await client.list(dir)
      uploadSpinner.succeed(`已连接 ${chalk.green(`目录: ==> ${alias}${dir}`)}`)
      if (fileList.length) {
        await createBackupFile(client, dir, alias)
      }
      const uploadFileSpinner = ora('上传中...').start()
      await client.uploadFromDir('dist', dir)
      uploadFileSpinner.succeed('上传成功 url:' + chalk.green(`${alias}${dir}/`))
    },
  }
}

async function createBackupFile(client, dir, alias) {
  const backupSpinner = ora(`创建备份文件中 ${chalk.yellow(`目录: ==> ${alias}${dir}`)}`).start()

  const fileName = `backup_${dayjs().format('YYYYMMDD_HHmmss')}.zip`

  const localDir = `./__temp/zip`
  const zipFilePath = `./__temp/${fileName}`

  if (!fs.existsSync(localDir)) {
    fs.mkdirSync(localDir, { recursive: true })
  }
  await client.downloadToDir(localDir, dir)
  backupSpinner.text = `下载远程文件成功 ${chalk.yellow(`目录: ==> ${alias}${dir}`)}`

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
    backupSpinner.fail('压缩失败')
    throw err
  })

  archive.pipe(output)
  archive.directory(localDir, false)
  await archive.finalize()
  backupSpinner.text = `压缩完成, 准备上传 ${chalk.yellow(`目录: ==> ${alias}${dir}/${fileName}`)}`

  await client.uploadFrom(zipFilePath, `${alias}${dir}/${fileName}`)
  backupSpinner.succeed(`备份成功 ${chalk.green(`目录: ==> ${alias}${dir}/${fileName}`)}`)

  fs.rmSync(`./__temp`, { recursive: true })
}
