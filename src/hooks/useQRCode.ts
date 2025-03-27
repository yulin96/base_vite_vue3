import QRCode from 'qrcode'
import { shallowRef, toRef, watch, type MaybeRefOrGetter } from 'vue'

export function useQRCode(text: MaybeRefOrGetter<string>, options?: QRCode.QRCodeToDataURLOptions) {
  const renderOptions: QRCode.QRCodeToDataURLOptions = {
    width: 1200,
    margin: 1,
    errorCorrectionLevel: 'H',
    ...options,
  }

  const src = toRef(text)
  const result = shallowRef('')

  watch(
    src,
    async (value) => {
      if (src.value) result.value = await QRCode.toDataURL(value, renderOptions)
    },
    { immediate: true },
  )

  return result
}
