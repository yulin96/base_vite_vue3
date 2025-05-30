import { ref } from 'vue'

/**
 * 返回一个布尔状态的引用和一个切换该状态的函数
 * @param initialValue 初始状态值，默认为false
 * @returns [state, toggle] 状态和切换函数的元组
 */
export function useStatus(initialValue: boolean = false) {
  // 创建一个响应式的布尔状态
  const state = ref(initialValue)

  // 定义切换状态的函数
  const toggle = (value?: boolean | undefined): boolean => {
    state.value = value !== undefined ? value : !state.value
    return state.value
  }

  return [state, toggle] as const
}
