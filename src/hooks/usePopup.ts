import { ref, toRefs } from 'vue'
import type { PickerOption } from 'vant'

interface PopupOption {
  id: number
  columns: PickerOption[]
  title?: string
  onConfirm: (data: {
    selectedValues: (string | number)[]
    selectedOptions: (string | number)[]
    selectedIndexes: (string | number)[]
  }) => void
}

export const usePopup = (options: PopupOption[]) => {
  const popupIns = ref({
    show: false,

    currentId: 0,
    title: '',
    columns: [] as PickerOption[],

    cancel() {
      this.show = false
    },

    confirm(data: {
      selectedValues: (string | number)[]
      selectedOptions: (string | number)[]
      selectedIndexes: (string | number)[]
    }) {
      const _option = options.find((item) => item.id === popupIns.value.currentId)
      if (!_option) throw new Error('未找到对应的选项')
      _option?.onConfirm(data)
      popupIns.value.show = false
    },
  })

  function showPopup(id: number) {
    const _option = options.find((item) => item.id === id)
    if (!_option) throw new Error('未找到对应的选项')
    popupIns.value.currentId = _option.id
    popupIns.value.title = _option.title || ''
    popupIns.value.columns = _option.columns
    popupIns.value.show = true
  }

  return { ...toRefs(popupIns.value), showPopup }
}
