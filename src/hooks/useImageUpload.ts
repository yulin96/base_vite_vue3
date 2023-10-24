import { objToFormData } from '~/utils/tools'
import { v1 } from 'uuid'
import compressorjs from 'compressorjs'

/**
 *
 * @param project_uuid 项目id
 * @param file 文件
 * @param filetype 文件类型
 * @param filenameStart 文件名前缀
 * @param needLoading 是否需要loading
 */

const uploadConfig = {
  prefix: 'az_',
  project_uuid: '',
}

export const useUploadImage = (file: File | Blob) => {
  return new Promise<string>((resolve, reject) => {
    const { project_uuid, prefix } = uploadConfig
    try {
      new compressorjs(file, {
        convertTypes: 'image/png',
        success: async (result) => {
          file = result
          const { data: configData } = await useLock().post(
            'https://center-service.event1.cn/oss/sign',
            objToFormData({ project_uuid }),
          )
          const { host, dir, accessid, policy, signature } = configData
          const key = dir + '/' + prefix + v1() + '.png'
          await useLock().post(
            host,
            objToFormData({
              key,
              OSSAccessKeyId: accessid,
              policy,
              Signature: signature,
              expire: 1446727949,
              success_action_status: 200,
              file: file,
            }),
          )
          const url = 'https://oss2.eventnet.cn/' + key
          resolve(url)
        },
        error: () => {
          reject()
        },
      })
    } catch (error) {
      reject()
    }
  })
}
