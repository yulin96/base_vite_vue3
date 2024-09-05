# 移动端项目基础库

## 项目说明

本项目是一个基于vue的移动端项目基础库，包含了一些常用的组件和工具函数，方便快速开发移动端项目。

## 使用

> [!TIP]
> 推荐使用pnpm安装依赖，pnpm可以共享依赖，节省磁盘空间。<br>
> 搭配[代码片段](https://github.com/yulin96/yulin96/blob/main/javascript-and-typescript.code-snippets)使用,效果贼好

```bash
pnpm install
pnpm dev
```

## 项目结构

- [api](src/api) 存放接口请求
- [assets](src/assets) 存放公共样式和资源
- [components](src/components) 存放公共组件
- [hooks](src/hooks) 存放自定义hooks
- [pages](src/pages) 存放页面
- [router](src/router) 存放路由配置
- [store](src/store) 存放pinia配置
- [tools](src/tools) 存放工具函数
- [env](.env) 项目主要配置文件

---

### 常用hooks介绍

#### [useCountDown](src/hooks/useCountDown.ts) 倒计时

- 倒计时hook，一般用于验证码倒计时

> [!TIP]
> 离开页面会自动清除定时器，不需要手动清除

```ts
// sending 是否正在发送验证码 Ref<boolean>
// timerText 倒计时文本 Ref<string> 默认为 '获取验证码'，发送中为 '**秒'
// startTimer 开始倒计时函数
const { sending, timerText, startTimer } = useCountdown()
```

#### [useClient](src/hooks/useClient.ts)

- 快速建立长链接<sup>第三方</sup>

```ts
//subScribes 加入的群组 string[] | string
//pub sub 订阅使用的账号信息
const { data } = useClient('subScribes', 'pub', 'sub')

watch(data, (newVal) => {
  console.log('newVal', newVal)
})
```

#### [useLock](src/hooks/useLock.ts)

- 请求hooks,防止重复请求
- 请求的baseURL为[.env](.env)中的VITE_APP_API_URL

```ts
// lock 是否正在请求 Ref<boolean>
// post get 请求函数  请求的函数url不以http开头会使用baseURL拼接 以http开头的url不会拼接
const { post: post*, lock } = useLock()
const { get: get*, lock } = useLock()

```

---

- 也可以把所有请求放置在api文件夹下，方便管理

```ts
// 由于catch已经在useLock中处理，所以不需要再次处理，当然也可以自行处理
const { post: postTest } = useLock()
export const apiTest = (data?: Record<string, any>) => {
  type T = any
  return new Promise<ResData<T>>((resolve, _) => {
    postTest('/test', data)
      .then((res) => {
        resolve(res as ResData<T>)
      })
      .catch(() => {})
  })
}

//使用
const res = await apiTest()
if (res.code != 200) return toast.info(res?.message || res?.msg || '正在处理中...')
```

#### [useToaster](src/hooks/useToaster.ts)

- promise toast提示

```ts
const [isProcessing, createToast] = useToaster('加载中...')

const handleRequest = async () => {
  if (isProcessing.value) return

  const [resolve, reject] = createToast()
  //...
  await sleep(2000)
  resolve('加载成功')
}
```

---

### pages介绍

> [!TIP]
> pages下的文件会自动注册到路由中，无需手动配置

---

### router介绍

- 由于无需手动配置路由，router不需要手动配置
- 一般需要做权限控制会在router中配置

```ts
router.beforeEach(async (to, from) => {
  // 配置路由拦截
})
```

---

### store介绍

- store使用pinia
- store数据会自动同步到本地存储中，储存路径位于[.env](.env)中VITE_APP_LOCALSTORAGE_NAME
- 刷新页面数据不会丢失

```ts
const { user } = useStore()
// store中的数据一般存放在user.info中 为了方便，类型设置为了any 可以随意添加😂
```

---

### 常用组件价绍

#### [audio](src/components/common/audio.vue) 背景音乐播放

- 集成了在微信中自动播放，以及右上角播放图标点击播放暂停功能

```html
<CommonAudio src="路径"></CommonAudio>
```

#### [image-scale](src/components/common/image-scale.vue) 图片缩放组件

- 图片缩放组件，支持双指缩放，单指拖动
- 可以缩放后使用html2canvas截图

> [!WARNING]
> 组件外层必须使用一个固定大小的容器包裹，否则无法正常使用

```html
<div class="h-500 w-600">
  <CommonImageScale
    url="https://oss.eventnet.cn/H5/zz/auto/benz2407_20240704/assets/bg-DIEWG6gQ.jpg"
  ></CommonImageScale>
</div>
```

#### [keyboard](src/components/common/keyboard.vue) 密码输入框

- 密码输入框，支持自定义长度

```vue
<script setup lang="ts">
const show = ref(true)

const next = (text: string) => {
  console.log(text)
}
</script>

<template>
  <CommonKeyboard v-model="show" @next="next" :max-length="4"></CommonKeyboard>
</template>
```

### ...
