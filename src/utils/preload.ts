/**
 * 预加载模块 - 用于预加载图片、视频、字体等资源
 */

// 预加载资源类型
export type PreloadResourceType = 'image' | 'video' | 'font' | 'audio'

// 预加载项接口
export interface PreloadItem {
  type: PreloadResourceType
  url: string
  key?: string // 可选的资源标识符
}

// 预加载配置选项
export interface PreloadOptions {
  onProgress?: (loaded: number, total: number, item?: PreloadItem) => void
  onComplete?: () => void
  onError?: (error: Error, item?: PreloadItem) => void
  timeout?: number // 超时时间（毫秒），默认为30000毫秒（30秒）
}

// 预加载结果
export interface PreloadResult {
  success: boolean
  resources: Map<string, HTMLElement | FontFace>
  errors: Map<string, Error>
}

/**
 * 预加载单张图片
 * @param url 图片URL
 * @param options 预加载选项
 * @returns Promise<HTMLImageElement>
 */
export function preloadImage(url: string, options: PreloadOptions = {}): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()

    // 设置超时处理

    const timeout = options.timeout ?? 30000 // 默认30秒超时
    const timeoutId = window.setTimeout(() => {
      reject(new Error(`图片加载超时: ${url}`))
    }, timeout)

    img.onload = () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (options.onComplete) options.onComplete()
      resolve(img)
    }

    img.onerror = (event) => {
      if (timeoutId) clearTimeout(timeoutId)
      const error = new Error(`图片加载失败: ${url}`)
      if (options.onError) options.onError(error, { type: 'image', url })
      reject(error)
    }

    // 开始加载图片
    img.src = url
  })
}

/**
 * 预加载单个视频
 * @param url 视频URL
 * @param options 预加载选项
 * @returns Promise<HTMLVideoElement>
 */
export function preloadVideo(url: string, options: PreloadOptions = {}): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.preload = 'auto'

    // 设置超时处理
    const timeout = options.timeout ?? 30000 // 默认30秒超时
    const timeoutId = window.setTimeout(() => {
      reject(new Error(`视频加载超时: ${url}`))
    }, timeout)

    // 视频可以播放时表示预加载成功
    video.oncanplaythrough = () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (options.onComplete) options.onComplete()
      resolve(video)
    }

    video.onerror = () => {
      if (timeoutId) clearTimeout(timeoutId)
      const error = new Error(`视频加载失败: ${url}`)
      if (options.onError) options.onError(error, { type: 'video', url })
      reject(error)
    }

    // 如果支持进度事件，监听加载进度
    if (options.onProgress) {
      video.addEventListener('progress', () => {
        if (video.buffered.length > 0) {
          const duration = video.duration
          const bufferedEnd = video.buffered.end(video.buffered.length - 1)
          options.onProgress?.(bufferedEnd, duration, { type: 'video', url })
        }
      })
    }

    // 开始加载视频
    video.src = url
    // 加载但不播放
    video.load()
  })
}

/**
 * 预加载字体
 * @param fontFamily 字体名称
 * @param url 字体URL
 * @param options 预加载选项
 * @returns Promise<FontFace>
 */
export function preloadFont(
  fontFamily: string,
  url: string,
  options: PreloadOptions = {},
): Promise<FontFace> {
  return new Promise((resolve, reject) => {
    // 检查FontFace API是否可用
    if (!('FontFace' in window)) {
      const error = new Error('当前浏览器不支持FontFace API')
      if (options.onError) options.onError(error, { type: 'font', url })
      reject(error)
      return
    }

    // 创建FontFace实例
    const fontFace = new FontFace(fontFamily, `url(${url})`)

    // 设置超时处理
    const timeout = options.timeout ?? 30000 // 默认30秒超时
    const timeoutId = window.setTimeout(() => {
      reject(new Error(`字体加载超时: ${url}`))
    }, timeout)

    // 加载字体
    fontFace
      .load()
      .then((loadedFace) => {
        if (timeoutId)
          clearTimeout(timeoutId)
          // 将字体添加到文档中
        ;(document.fonts as FontFaceSet).add(loadedFace)
        if (options.onComplete) options.onComplete()
        resolve(loadedFace)
      })
      .catch((error) => {
        if (timeoutId) clearTimeout(timeoutId)
        if (options.onError) options.onError(error, { type: 'font', url })
        reject(error)
      })
  })
}

/**
 * 预加载音频
 * @param url 音频URL
 * @param options 预加载选项
 * @returns Promise<HTMLAudioElement>
 */
export function preloadAudio(url: string, options: PreloadOptions = {}): Promise<HTMLAudioElement> {
  return new Promise((resolve, reject) => {
    const audio = new Audio()

    // 设置超时处理
    const timeout = options.timeout ?? 30000 // 默认30秒超时
    const timeoutId = window.setTimeout(() => {
      reject(new Error(`音频加载超时: ${url}`))
    }, timeout)

    audio.oncanplaythrough = () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (options.onComplete) options.onComplete()
      resolve(audio)
    }

    audio.onerror = () => {
      if (timeoutId) clearTimeout(timeoutId)
      const error = new Error(`音频加载失败: ${url}`)
      if (options.onError) options.onError(error, { type: 'audio', url })
      reject(error)
    }

    // 如果支持进度事件，监听加载进度
    if (options.onProgress) {
      audio.addEventListener('progress', () => {
        if (audio.buffered.length > 0) {
          const duration = audio.duration
          const bufferedEnd = audio.buffered.end(audio.buffered.length - 1)
          options.onProgress?.(bufferedEnd, duration, { type: 'audio', url })
        }
      })
    }

    // 开始加载音频
    audio.src = url
    audio.load()
  })
}

/**
 * 批量预加载资源
 * @param items 预加载项数组
 * @param options 预加载选项
 * @returns Promise<PreloadResult>
 */
export async function preloadResources(
  items: PreloadItem[],
  options: PreloadOptions = {},
): Promise<PreloadResult> {
  const timeout = options.timeout ?? 30000 // 默认30秒超时
  const total = items.length
  let loaded = 0
  const resources = new Map<string, HTMLElement | FontFace>()
  const errors = new Map<string, Error>()

  const result: PreloadResult = {
    success: false,
    resources,
    errors,
  }

  // 更新进度的辅助函数
  const updateProgress = (item?: PreloadItem) => {
    loaded++
    if (options.onProgress) {
      options.onProgress(loaded, total, item)
    }
  }

  await Promise.all(
    items.map(async (item) => {
      const key = item.key || item.url
      try {
        let resource: HTMLElement | FontFace

        switch (item.type) {
          case 'image':
            resource = await preloadImage(item.url, {
              timeout: timeout,
              onError: (error) => options.onError?.(error, item),
            })
            break
          case 'video':
            resource = await preloadVideo(item.url, {
              timeout: timeout,
              onError: (error) => options.onError?.(error, item),
            })
            break
          case 'audio':
            resource = await preloadAudio(item.url, {
              timeout: timeout,
              onError: (error) => options.onError?.(error, item),
            })
            break
          case 'font':
            // 字体需要额外的字体名称，从URL中提取
            const fontName = key.split('/').pop()?.split('.')[0] || 'preloadedFont'
            resource = await preloadFont(fontName, item.url, {
              timeout: timeout,
              onError: (error) => options.onError?.(error, item),
            })
            break
          default:
            throw new Error(`不支持的预加载类型: ${item.type}`)
        }

        resources.set(key, resource)
      } catch (error) {
        if (error instanceof Error) {
          errors.set(key, error)
        } else {
          errors.set(key, new Error(String(error)))
        }
      } finally {
        updateProgress(item)
      }
    }),
  )

  result.success = errors.size === 0

  if (options.onComplete) {
    options.onComplete()
  }

  return result
}
