import axios from 'axios'
import { toFormData } from '~/utils/tools'
import { v1 } from 'uuid'
import { showSuccessToast } from 'vant'

/**
 *
 * @param project_uuid 项目id
 * @param file 文件
 * @param filetype 文件类型
 * @param filenameStart 文件名前缀
 * @param needLoading 是否需要loading
 */

export const useUploadImage = async (
  project_uuid: string,
  file: File | Blob,
  filetype?: string,
  filenameStart: string = 'az',
  needLoading: boolean = false,
) => {
  return new Promise<string>((resolve, _) => {
    axios
      .post('https://center-service.event1.cn/oss/sign', { project_uuid })
      .then(({ data: { data: configData } }) => {
        const { host, dir, accessid: OSSAccessKeyId, policy, signature: Signature } = configData
        const key = dir + '/' + filenameStart + v1() + '.' + (filetype ? filetype : 'png')
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
          .finally(() => {
            const fileUrl = 'https://oss2.eventnet.cn/' + key
            needLoading && showSuccessToast({ message: '上传成功' })
            resolve(fileUrl)
          })
      })
      .catch(() => {
        resolve('')
      })
  })
}
