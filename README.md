# 移动端项目基础库

本项目是基于 Vue3 + Vite 的移动端项目基础库，集成了丰富的组件、自动化开发体验、常用工具函数和最佳实践，适合快速搭建高质量移动端应用。

---

## 主要特性

- **自动化开发体验**：

  - PC 端自动添加右侧二维码，扫码即可体验。
  - `pages` 目录下页面自动注册为路由，支持类型推断。
  - 路由类型自动提示，开发更安全。
  - Pinia store 自动同步到本地存储，刷新不丢失。
  - 打包后自动压缩图片（依赖 sharp，需 Node 18.17.0+）。
  - 自动上传 OSS（需配置 zAccessKeyId、zAccessKeySecret、zBucket）。
  - 支持只打包不上传（`pnpm build-only`）。

- **丰富的目录结构**：

  - `api/`：接口请求与类型定义。
  - `assets/`：全局样式、图片资源。
  - `components/`：高复用基础组件，覆盖音频、图片缩放、密码键盘等。
  - `hooks/`：常用自定义 hooks，提升开发效率。
  - `pages/`：页面文件，自动注册路由。
  - `router/`：路由守卫、权限控制。
  - `stores/`：Pinia 状态管理，自动本地持久化。
  - `utils/`：常用工具函数，详见 [src/utils/README.md](src/utils/README.md)。
  - `shared/`：通用方法、第三方集成、全局配置。

- **现代工程化**：
  - Vite 极速开发与热更新。
  - TypeScript 全面类型支持。
  - Tailwind CSS 按需原子化样式。
  - 代码分割、懒加载、自动导入。
  - 代码片段推荐，提升开发效率。

---

## 快速开始

> 推荐使用 pnpm 安装依赖，节省磁盘空间。

```bash
pnpm install
pnpm dev

# 打包并自动上传 OSS（需配置环境变量 zAccessKeyId、zAccessKeySecret、zBucket）
pnpm build

# 只打包不上传 OSS
pnpm build-only
```

### 环境变量配置

- Windows：
  ```powershell
  setx zAccessKeyId "xxx"
  setx zAccessKeySecret "xxx"
  setx zBucket "xxx"
  ```
- Mac/Linux：
  ```bash
  export zAccessKeyId="xxx"
  export zAccessKeySecret="xxx"
  export zBucket="xxx"
  ```
- 上传路径由 `.env` 中 `VITE_OSS_ROOT_DIRNAME` 和 `VITE_OSS_DIRNAME` 控制。

---

## 目录结构说明

- `api/`：接口请求与类型定义。
- `assets/`：全局样式、图片资源。
- `components/`：高复用基础组件。
- `hooks/`：常用自定义 hooks。
- `pages/`：页面文件，自动注册路由。
- `router/`：路由守卫、权限控制。
- `stores/`：Pinia 状态管理。
- `utils/`：常用工具函数，详见 [src/utils/README.md](src/utils/README.md)。
- `shared/`：通用方法、第三方集成、全局配置。

---

## 常用 hooks 说明

- `useCountDown`：验证码倒计时，离开页面自动清理定时器。
- `useClient`：快速建立长链接，支持 pub/sub。
- `useLock`：防止重复请求，自动拼接 baseURL。
- `useToaster`：Promise Toast 便捷提示。
- 其余 hooks 详见 `src/hooks/` 目录源码。

---

## 常用组件说明

- `audio`：背景音乐播放，支持微信自动播放。
- `image-scale`：图片缩放，支持双指缩放、单指拖动。
- `keyboard`：自定义密码输入框。
- 其余组件详见 `src/components/` 目录。

---

## 工具函数说明

详见 [src/utils/README.md](src/utils/README.md)。涵盖动画、加密、DOM、图片、用户操作、校验等。

### 常用工具函数示例

#### 1. 复制文本到剪贴板

```ts
import { copyText } from '@/utils/user/copyText'
await copyText('hello world')
```

#### 2. 随机数与随机字符串

```ts
import { randomNum, randomString } from '@/utils/random'
const n = randomNum(1, 10)
const str = randomString('prefix', 8)
```

#### 3. 校验邮箱/手机号/身份证

```ts
import { isEmail, isPhone, isIdCard } from '@/utils/validator'
isEmail('test@xx.com') // true/false
isPhone('13800138000') // true/false
isIdCard('110101199003071234') // true/false
```

#### 4. 图片压缩

```ts
import { compressImage } from '@/utils/photo/compressImage'
const blob = await compressImage(file)
```

#### 5. 页面跳转

```ts
import { toUrl } from '@/utils/user/location'
toUrl('https://example.com', { newTab: true })
```

更多用法详见 [src/utils/README.md](src/utils/README.md) 及各工具源码。

---

## 进阶用法

- **自动路由注册**：`pages` 下页面自动注册，无需手动配置。
- **路由守卫**：在 `router/guards.ts` 配置权限控制。
- **Pinia 自动持久化**：store 数据自动同步本地存储，刷新不丢失。
- **OSS 上传**：打包后自动上传，支持自定义路径。

---
