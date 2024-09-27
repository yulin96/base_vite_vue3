import { type Plugin } from 'vite'

interface OssDeployOptions {
  accessKeyId: string
  accessKeySecret: string
  bucket: string
  region: string

  deployPath: string
}

export default function ossDeployPlugin(option: OssDeployOptions): Plugin {
  return {
    name: 'vite-plugin-oss-deploy',
    apply: 'build',
    closeBundle() {
      // 上传文件到 oss
    },
  }
}
