# src/shared 目录说明

本目录用于存放全局共享方法、第三方集成、全局配置、通用数据等，便于项目各处复用。

## 主要结构与内容

- `common.ts`：通用工具方法。
- `env.ts`：环境变量、运行环境相关。
- `index.ts`：shared 统一出口。
- `keys.ts`：全局常量、Key 定义。
- `data/`：常用静态数据、配置数据。
- `directive/`：自定义指令集合。
- `gsap/`：GSAP 动画相关封装。
- `request/`：全局请求封装、拦截器等。
- `setup/`：全局初始化逻辑（如二维码、rem、微信字体、hm 埋点等）。
- `third/`：第三方平台集成（如微信、钉钉等）。
- `time/`：时间、日期相关工具。
- `vant/`：Vant 组件二次封装。
- `zoomist/`：图片缩放相关。

## 使用方式

可直接从具体文件导入需要的内容。例如：

```ts
import { createQRCode } from '@/shared/setup/createQRCode'
import { setRem } from '@/shared/setup/setRem'
import { wx } from '@/shared/third/wx'
```

## 常用示例

### 1. 创建二维码

```ts
import { createQRCode } from '@/shared/setup/createQRCode'
const url = 'https://example.com'
const qrcode = createQRCode(url)
```

### 2. 设置 rem 基准

```ts
import { setRem } from '@/shared/setup/setRem'
setRem(375) // 以 375 设计稿为基准
```

### 3. 微信 JS-SDK 调用

```ts
import { wx } from '@/shared/third/wx'
wx.config({ ... })
wx.ready(() => { /* ... */ })
```

### 4. 全局请求拦截

```ts
import { request } from '@/shared/request'
request.get('/api/user')
```

详细用法请参考各文件源码及注释。
