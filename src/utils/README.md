# src/utils 工具库说明

本文件夹包含了本项目常用的工具函数，涵盖动画、加密、DOM 操作、图片处理、用户操作、校验等多个方面，极大提升开发效率。以下为各子模块及主要功能简要说明：

## 目录结构

- animate/ 动画相关工具
- crypto/ 加密与解密相关
- dom/ DOM 操作与交互
- photo/ 图片处理
- user/ 用户操作与交互
- validator/ 校验与环境检测
- convert.ts 各类数据/格式转换
- location.ts 页面跳转、重载等
- random.ts 随机数、随机字符串等
- ua.ts UserAgent 检测
- index.ts 工具库总入口

---

## 各模块功能简介

### animate/

- confetti.ts：彩带动画，支持顶部、两侧等多种效果。
- frameAnimation.ts：帧动画播放，支持自动播放、循环、封面等。
- lottie.ts：Lottie 动画支持。
- notate.ts、stars.ts：特殊动画效果。

### crypto/

- crypto.ts：基础加密解密方法。
- cryptoJS.ts：CryptoJS 常用加密算法封装。
- jsencrypt.ts：RSA 加密。

### dom/

- autoScaleBox.ts：自适应缩放容器。
- boundsMove.ts：边界拖动。
- dom.ts：通用 DOM 操作。
- generateCaptcha.ts：验证码生成。
- sign.ts：签名相关。

### photo/

- compressImage.ts：图片压缩，基于 compressorjs。
- createAntiqueImage.ts：图片做旧特效。

### user/

- copyText.ts：复制文本到剪贴板。
- createToaster.ts：Promise Toast 便捷提示。
- downloadFile.ts：文件下载，支持进度提示。
- focus.ts：聚焦并高亮 DOM 元素。
- getOpenId.ts：获取微信 openid。
- media.ts：图片选择与压缩。
- preload.ts：资源预加载（图片、视频、字体等）。
- registerButtonEffect.ts：按钮点击动效。
- scan.ts：扫码功能，兼容微信/钉钉。
- share.ts：微信分享注册。
- showImage.ts：图片预览，兼容微信/移动端。
- uploadFile.ts：文件上传，支持 OSS。

### validator/

- index.ts：常用校验（邮箱、手机号、身份证）、环境检测（HTTPS、深色模式、摄像头、WebP 支持等）。

### 其它工具

- convert.ts：URL/Blob/图片等格式转换。
- location.ts：页面跳转、重载、拨号等。
- random.ts：随机数、随机字符串、UUID。
- ua.ts：浏览器/终端环境检测。

---

## 使用方式

所有工具均可直接从具体文件导入使用。例如：

```ts
import { copyText } from '@/utils/user/copyText'
import { randomNum } from '@/utils/random'
import { isEmail } from '@/utils/validator'
```

---

## 常用工具函数示例

### 1. 复制文本到剪贴板

```ts
import { copyText } from '@/utils/user/copyText'
await copyText('hello world')
```

### 2. 随机数与随机字符串

```ts
import { randomNum, randomString } from '@/utils/random'
const n = randomNum(1, 10)
const str = randomString('prefix', 8)
```

### 3. 校验邮箱/手机号/身份证

```ts
import { isEmail, isPhone, isIdCard } from '@/utils/validator'
isEmail('test@xx.com') // true/false
isPhone('13800138000') // true/false
isIdCard('110101199003071234') // true/false
```

### 4. 图片压缩

```ts
import { compressImage } from '@/utils/photo/compressImage'
const blob = await compressImage(file)
```

### 5. 页面跳转

```ts
import { toUrl } from '@/utils/user/location'
toUrl('https://example.com', { newTab: true })
```

### 6. 生成二维码

```ts
import { createQRCode } from '@/shared/setup/createQRCode'
const qrcode = createQRCode('https://example.com')
```

详细用法请参考各文件源码及注释。
