import { setDialogDefaultOptions, showDialog } from 'vant'
import 'vant/es/dialog/style'

setDialogDefaultOptions({
  title: '温馨提示',
  theme: 'round-button',
  allowHtml: true,
  teleport: '#app',
})

export const showMyDialog = showDialog
