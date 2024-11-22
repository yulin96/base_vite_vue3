import { type ComponentPublicInstance, ref } from 'vue'

export function useRef() {
  type EleType = Element | ComponentPublicInstance | null

  const refList = ref<Record<string, EleType>>({})

  const setRef = (e: EleType) => {
    if (e instanceof Element && e.getAttribute('name')) {
      const name = e.getAttribute('name') as string
      refList.value[name] = e
    }
  }

  return [refList, setRef] as [typeof refList, typeof setRef]
}
