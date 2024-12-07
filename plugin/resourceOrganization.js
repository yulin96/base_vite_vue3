//@ts-check
import fs from 'node:fs'
import path from 'node:path'
import { normalizePath } from 'vite'

let outDir = 'dist'
let base = './'
const imgResources = []

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']

function readImgs(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true })
  files.forEach((file) => {
    const filePath = path.join(dir, file.name)
    if (file.isDirectory()) return readImgs(filePath)
    if (imageExtensions.includes(path.extname(file.name))) {
      imgResources.push(normalizePath(base + filePath.replace(path.resolve(outDir), '')))
    }
  })
}

/**
 *
 * @returns {import('vite').Plugin}
 */
export default function resourceOrganization() {
  return {
    name: 'vite-plugin-resource-organization',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
      base = config.base
    },
    closeBundle() {
      readImgs(path.resolve(outDir))

      const htmlImgResources = `[${imgResources.map((i) => `"${i}"`)}];`

      const indexHtml = path.resolve(outDir, 'index.html')
      let html = fs.readFileSync(indexHtml, 'utf-8')
      html = html.replace(
        '<head>',
        `<head>\n\n    <script>\n    window.IMG_RESOURCES=${htmlImgResources}\n    </script>\n`,
      )
      fs.writeFileSync(indexHtml, html)
    },
  }
}
