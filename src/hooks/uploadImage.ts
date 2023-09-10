import { objToFormData } from '@/utils/tools'

const { post: get_permissions } = useLock()
const { post: post_upload } = useLock()
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
  file: any,
  filetype?: string,
  filenameStart: string = 'az',
  needLoading: boolean = true,
) => {
  try {
    needLoading && showLoadingToast({ message: '上传中...', duration: 0 })
    const { data: configData } = await get_permissions(
      'https://center-service.event1.cn/oss/sign',
      objToFormData({ project_uuid }),
    )
    const { host, dir, accessid: OSSAccessKeyId, policy, signature: Signature } = configData
    const key = dir + '/' + randomName(filenameStart) + '.' + (filetype ? filetype : '')
    await post_upload(
      host,
      objToFormData({
        key,
        OSSAccessKeyId,
        policy,
        Signature,
        expire: 1446727949,
        success_action_status: 200,
        file: file,
      }),
    )
    const fileUrl = 'https://oss2.eventnet.cn/' + key
    needLoading && showSuccessToast({ message: '上传成功' })
    return fileUrl
  } catch (error) {
    needLoading && showFailToast({ message: '上传失败' })
    return ''
  }
}
