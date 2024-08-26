import axios, { toFormData } from 'axios'
import { v4 } from 'uuid'
import { toast } from 'vue-sonner'

interface IUploadOption {
  projectID: string
  file: File
  filetype?: string
  filenameStart?: string
  needLoading?: boolean
}

export async function uploadFile(option: IUploadOption): Promise<[null, string] | [unknown, null]> {
  const { projectID, file, filetype = 'png', filenameStart = 'zh', needLoading = true } = option

  let toastId: number | string | null = null

  needLoading && (toastId = toast.loading('上传中...'))

  try {
    const {
      data: { data: config },
    } = await axios.post('https://center-service.event1.cn/oss/sign', { project_uuid: projectID })
    const { host, dir, accessid: OSSAccessKeyId, policy, signature: Signature } = config
    const key = `${dir}/${filenameStart}-${v4()}.${filetype}`
    const res = await axios.post(
      host,
      toFormData({
        key,
        OSSAccessKeyId,
        policy,
        Signature,
        expire: 1446727949,
        success_action_status: 200,
        file: file,
      }),
    )
    if (res.status != 200) console.error('上传失败')

    const fileUrl = `https://oss2.eventnet.cn/${key}`

    needLoading && toast.success('上传成功').toString()
    toastId && toast.dismiss(toastId)

    return [null, fileUrl]
  } catch (error) {
    needLoading && toast.error('上传失败').toString()
    toastId && toast.dismiss(toastId)

    return [error, null]
  }
}
