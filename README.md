# 项目基础框架

## 目录介绍

### patches

修改npm包源码

[html2canvas](patches/html2canvas@1.0.0-rc.4.patch) ：package.json 锁定1.0.0-rc4版本，patch修复部分情况下字体下沉问题

### scan

添加第二路由，一般用户扫码核销

### typing

声明文件

### env

env 文件下可以配置页面标题，分享标题描述等(配置即生效)

- VITE_APP_API_URL 用于请求的基础地址

- VITE_APP_LOCALSTORAGE_NAME 用户pinia本地化的localStorage 名称

### tailwind.config.ts

- w-0 到 w-1000，h-0到 h-1000 进行了定义

- 注册了常用三个类名 flex-center back-top back-bottom (编写class时可以触发建议)

- ...

### src

项目根目录

- assets 资源文件(src/assets)

- components 组件(src/components)

  - TransitionToTop.vue (src/components/TransitionToTop.vue) 切换组件

    ```vue
    <transition-to-top>
        <div v-if=""></div>
        <div v-else-if=""></div>
    </transition-to-top>
    ```

  - VAudio.vue (src/components/VAudio.vue) 全局音乐组件 src 必传项

    ```vue
    <v-audio :src="''"></v-audio>
    ```

  - VImgScale.vue (src/components/VImgScale.vue) 图片缩放裁剪组件 外层需要一个div限制裁剪宽高

    ```vue
    <div class="h-[600px] w-[600px]">
        <v-img-scale :url="'https://oss.eventnet.cn/H5/zz/wiwpuroce/bg.jpg'"></v-img-scale>
    </div>
    ```

  - VNewBack (src/components/VNewBack.vue) 返回按钮 可以挪动自动贴边。注: 放在app.vue里

    - icon 必传

    - linkMap 必传 对象格式，key为要显示返回按钮的页面，value为要返回的页面

    ```vue
    <v-new-back :link-map="{ page2: 'page1' }" :icon="'icon'"></v-new-back>
    <!-- 此处为page2显示返回按钮，点击返回返回page1 -->
    ```

  - VNotFound.vue (src/components/VNotFound.vue) 404页面

  - VWxLogin.vue (src/components/VWxLogin.vue) 微信登录授权弹出框

    - code 后台生成的code值

    - name 公众号名称 默认(互动微平台)

    ```
    <!-- 只需要传入name和code，如果不需要name可以不传。其他什么都不用做 -->
    <v-wx-login :code="'20654ae270d21db'"></v-wx-login>

    <!-- 然后在所有页面使用,不用关心授权如何巴拉巴拉 -->
    const { user } = useStore();使用store前先配置env文件中的VITE_APP_LOCALSTORAGE_NAME
    const { wxInfo } = user;
    console.log(wxInfo.nickname, wxInfo.openid, wxInfo.portrait);
    ```

- utils 工具类

  - 微信扫码

    ```
    WxScanQRCode().then((res)=>{})
    ```

  - 微信打开位置

    ```
    WxOpenLocation({
      latitude: 0,
      longitude: 0,
      name: '',
      address: '',
    })
    ```

  - ...

- ...

---

#### vscode常用snippets

- typescript.json

  ```json
  {
    "arrow function": {
      "prefix": "an",
      "body": ["($1) => $2"],
      "description": "arrow function"
    },
    "const": {
      "prefix": "cs",
      "body": ["const { $2 } = $1"],
      "description": "function"
    },
    "const store": {
      "prefix": "css",
      "body": ["const { user } = useStore()"],
      "description": "store function"
    },
    "const post": {
      "prefix": "csp",
      "body": ["const { post: p_$1 } = useLock()"],
      "description": "lock function"
    },
    "const get": {
      "prefix": "csg",
      "body": ["const { get: g_$1 } = useLock()"],
      "description": "lock function"
    },
    "timer": {
      "prefix": "zTime",
      "body": ["const { sending, timerText, startTimer, stopTimer } = useTimer()"],
      "description": "timer"
    },
    "watch": {
      "prefix": "zWatch",
      "body": ["watch($1, (newVal, oldVal) => {", " $2 ", "})"],
      "description": "watch"
    },
    "watch2": {
      "prefix": "zWatch2",
      "body": ["watch(", "  () => $1,", "  (newVal, oldVal) => {", "  $2  ", "  },", ")"],
      "description": "watch2"
    },
    "reactive": {
      "prefix": "reactive",
      "body": ["const $1 = reactive({", " $2 ", "})"],
      "description": "reactive"
    },
    "ref": {
      "prefix": "ca",
      "body": ["const $1 = ref($2)"],
      "description": "ref"
    },
    "tt": {
      "prefix": "tt",
      "body": ["const [${1:value}, toggle_${1:value}] = useToggle()"],
      "description": "tt"
    },
    "route": {
      "prefix": "cr",
      "body": ["const route = useRoute($1)"],
      "description": "route"
    },
    "crr": {
      "prefix": "crr",
      "body": ["const router = useRouter()"],
      "description": "crr"
    },
    "rr": {
      "prefix": "rr",
      "body": ["router.replace({ name: '$1' })"],
      "description": "rr"
    },
    "aw": {
      "prefix": "aw",
      "body": [
        "const ${2:res} = await $1()"
        "if (!${2:res}) return"
      ],
      "description": "aw"
    },
    "ag": {
      "prefix": "ag",
      "body": [
        "const { get: get_${1:name} } = useLock()",
        "export const api_${1:name} = (data: Record<string, any> = {}) =>",
        "  new Promise<IRes | null>((resolve, _) => {",
        "    get_${1:name}('/${1:name}', data).then((res) => {",
        "      if (res.code == 200) {",
        "        resolve(res)",
        "      } else {",
        "        resolve(null)",
        "        showToast({ message: res?.msg || res?.message })",
        "      }",
        "    })",
        "  })"
      ],
      "description": "ag"
    },
    "ap": {
      "prefix": "ap",
      "body": [
        "const { post: post_${1:name} } = useLock()",
        "export const api_${1:name} = (data: Record<string, any> = {}) =>",
        "  new Promise<IRes | null>((resolve, _) => {",
        "    post_${1:name}('/${1:name}', data).then((res) => {",
        "      if (res.code == 200) {",
        "        resolve(res)",
        "      } else {",
        "        resolve(null)",
        "        showToast({ message: res?.msg || res?.message })",
        "      }",
        "    })",
        "  })"
      ],
      "description": "ap"
    }
  }
  ```

- vue.json

  - gsap.context 是为了隔离

  ```json
  {
    "zTemp": {
      "prefix": "zTemp",
      "body": [
        "<script setup lang=\"ts\">",
        "/*  */",
        "onMounted(() => {",
        "  gsap.context(() => {}, '.${TM_FILENAME_BASE/[\\[\\]]//g}')",
        "})",
        "</script>",
        "",
        "<template>",
        "  <div class=\"${TM_FILENAME_BASE/[\\[\\]]//g}\">",
        "    <div class=\"content\">$2</div>",
        "  </div>",
        "</template>",
        ""
      ],
      "description": "zTemp"
    },
    "zTemp2": {
      "prefix": "zTemp2",
      "body": [
        "<template>",
        "  <div class='page'>",
        "  </div>",
        "</template>",
        "",
        "<script>",
        "export default {",
        "  components: {},",
        "  name: '',",
        "  data () {",
        "    return {",
        "",
        "    };",
        "  },",
        "  /* 创建前 */",
        "  beforeCreate () { },",
        "  /* 创建后 */",
        "  created () { },",
        "  /* 挂载前 */",
        "  beforeMount () { },",
        "  /* 挂载后 */",
        "  mounted () { },",
        "  /* 内部方法 */",
        "  methods: {},",
        "  /* 监听属性变化 */",
        "  watch: {},",
        "  /* 计算属性 */",
        "  computed: {},",
        "  /* 更新前 */",
        "  beforeUpdate () { },",
        "  /* 更新后 */",
        "  updated () { },",
        "  /* 卸载前 */",
        "  beforedestory () { },",
        "  /* 卸载后 */",
        "  destroyed () { }",
        "};",
        "",
        "</script>",
        "<style lang='scss' scoped>",
        "",
        "</style>"
      ],
      "description": "zTemp2"
    }
  }
  ```
