export async function copyText(text: string) {
  try {
    if (navigator.clipboard && navigator.permissions) {
      await navigator.clipboard.writeText(text)
      return true
    }

    const textArea = document.createElement('textArea') as HTMLTextAreaElement
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-9999px'
    textArea.style.top = '10px'
    textArea.setAttribute('readonly', 'readonly')
    document.body.appendChild(textArea)
    textArea.select()

    const success = document.execCommand('copy')
    document.body.removeChild(textArea)
    if (!success) {
      throw new Error('无法复制文本')
    }
  } catch (err) {
    return false
  }
}
