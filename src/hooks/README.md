# src/hooks 目录说明

本目录包含了项目常用的自定义 hooks，全部基于 Vue 3 Composition API，极大提升开发效率和代码复用性。

## 主要 hooks 列表

- `useActive`：元素激活与高亮状态管理。
- `useClient`：快速建立长链接，支持 pub/sub。
- `useLoading`：全局/局部 loading 状态管理。
- `useLock` / `useLockRequest`：防止重复请求，自动拼接 baseURL。
- `useMaskLoading`：遮罩 loading 效果。
- `usePromise`：Promise 封装，便于异步流程控制。
- `useQRCode`：二维码生成与解析。
- `useRouterTransition`：路由切换动画。
- `useSlide` / `useSlide.back`：滑动手势与页面切换。
- `useStatus`：状态管理与切换。
- `useTimer`：定时器封装，支持倒计时等。
- `useToaster`：Promise Toast 便捷提示。
- `useTransform`：元素变换、拖拽等。

## 使用方式

所有 hooks 可直接从具体文件导入使用，例如：

```ts
import { useLock } from '@/hooks/useLock'
import { useToaster } from '@/hooks/useToaster'
```

## 常用 hooks 示例

### 1. useLock 防止重复请求

```ts
import { useLock } from '@/hooks/useLock'
const { post, lock } = useLock()
const onSubmit = async () => {
  if (lock.value) return
  await post('/api/submit', { foo: 'bar' })
}
```

### 2. useToaster 异步 Toast 提示

```ts
import { useToaster } from '@/hooks/useToaster'
const [isProcessing, createToast] = useToaster('加载中...')
const handleRequest = async () => {
  if (isProcessing.value) return
  const [resolve, reject] = createToast()
  try {
    await someAsyncTask()
    resolve('加载成功')
  } catch {
    reject('加载失败')
  }
}
```

### 3. useTimer 倒计时

```ts
import { useTimer } from '@/hooks/useTimer'
const { sending, timerText, startTimer } = useTimer(60)
// sending: Ref<boolean> 是否倒计时中
timerText.value // 显示剩余秒数文本
startTimer() // 开始倒计时
```

### 4. useQRCode 生成二维码

```ts
import { useQRCode } from '@/hooks/useQRCode'
const { qrcodeUrl, createQRCode } = useQRCode()
createQRCode('https://example.com')
// qrcodeUrl.value 即为二维码图片地址
```

详细用法请参考各 hooks 源码及注释。
