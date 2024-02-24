import axios from 'axios'
import { toFormData } from '~/utils/tools'
import { v1 } from 'uuid'
import { showSuccessToast } from 'vant'

interface IUploadOption {
  projectID: string
  file: File
  filetype?: string
  filenameStart?: string
  needLoading?: boolean
}

export const useUploadOSS = async (option: IUploadOption) => {
  const { projectID, file, filetype = 'png', filenameStart = 'zh', needLoading = true } = option

  needLoading && showLoadingToast({ message: '上传中...' })

  return new Promise<string>((resolve, _) => {
    axios
      .post('https://center-service.event1.cn/oss/sign', { project_uuid: projectID })
      .then(({ data: { data: configData } }) => {
        const { host, dir, accessid: OSSAccessKeyId, policy, signature: Signature } = configData
        const key = `${dir}/${filenameStart}-${v1()}.${filetype}`
        axios
          .post(
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
          .then((res) => {
            if (res.status == 200) {
              const fileUrl = `https://oss2.eventnet.cn/${key}`
              needLoading && showSuccessToast({ message: '上传成功' })
              resolve(fileUrl)
            } else {
              resolve('')
            }
          })
      })
      .catch(() => {
        resolve('')
      })
  })
}
