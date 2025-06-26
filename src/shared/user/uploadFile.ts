import { sleep } from '@/shared/common'
import axios, { toFormData } from 'axios'
import COS from 'cos-js-sdk-v5'
import { v4 } from 'uuid'
import { toast } from 'vue-sonner'

type IUploadOption = {
  id: string
  file: File
  type?: string
  start?: string
  loading?: boolean
  test?: boolean
}

export async function uploadFile(option: IUploadOption): Promise<[null, string] | [unknown, null]> {
  return new Promise<[null, string] | [unknown, null]>(async (resolve) => {
    const { id, file, type = 'jpg', start = 'zh', loading = false, test = true } = option

    let toastId: number | string | null = null
    loading && (toastId = toast.loading('上传中...'))

    try {
      const {
        data: { data },
      } = await axios.post('https://rally.event1.cn/bn9z/sts', toFormData({ puid: id }))

      const { startTime, expiredTime, bucket, region, dir } = data
      const { sessionToken, tmpSecretId, tmpSecretKey } = data.credentials

      const cos = new COS({
        getAuthorization: function (_, callback) {
          callback({
            TmpSecretId: tmpSecretId,
            TmpSecretKey: tmpSecretKey,
            SecurityToken: sessionToken,
            StartTime: startTime,
            ExpiredTime: expiredTime,
          })
        },
      })

      const Key = `${dir}/${start}-${v4()}.${type}`

      cos.uploadFile(
        {
          Bucket: bucket,
          Region: region,
          Key,
          Body: file,
          SliceSize: 1024 * 1024,
        },
        async (err, data) => {
          if (err) return (uploadToast(toastId, '上传失败'), resolve([err, null]))

          await sleep(5000)
          const url = `https://oss.1ycloud.com/${Key}`
          if (test) {
            const isImage = await isImageUrl(url)
            if (!isImage) {
              return (uploadToast(toastId, '上传图片不符合规范，请更换图片重试'), resolve([err, null]))
            }
          }
          uploadToast(toastId, '上传成功', true)
          resolve([null, url])
        },
      )
    } catch (error) {
      ;(uploadToast(toastId, '上传失败'), resolve([error, null]))
    }
  })
}

function uploadToast(toastId: number | string | null, message: string, success?: boolean) {
  if (toastId !== null) {
    toast.dismiss(toastId)
    toastId = null
    success ? toast.success(message) : toast.error(message)
  }
}

export function isImageUrl(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}
