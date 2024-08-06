import axios, { toFormData } from 'axios'
import { v1 } from 'uuid'
import { showSuccessToast } from 'vant'

interface IUploadOption {
  projectID: string
  file: File
  filetype?: string
  filenameStart?: string
  needLoading?: boolean
}

export async function uploadFile(option: IUploadOption): Promise<[null, string] | [unknown, null]> {
  const { projectID, file, filetype = 'png', filenameStart = 'zh', needLoading = true } = option

  needLoading && showLoadingToast({ message: '上传中...' })

  try {
    const {
      data: { data: config },
    } = await axios.post('https://center-service.event1.cn/oss/sign', { project_uuid: projectID })
    const { host, dir, accessid: OSSAccessKeyId, policy, signature: Signature } = config
    const key = `${dir}/${filenameStart}-${v1()}.${filetype}`
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
      })
    )
    if (res.status != 200) console.error('上传失败')

    const fileUrl = `https://oss2.eventnet.cn/${key}`
    needLoading && showSuccessToast({ message: '上传成功' })
    return [null, fileUrl]
  } catch (error) {
    needLoading && showSuccessToast({ message: '上传失败' })
    return [error, null]
  }
}
