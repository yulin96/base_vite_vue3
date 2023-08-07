import axios from 'axios'
// import VConsole from 'vconsole'

const getProjectStatus = () => {
  if (!VCONSOLE_ID) return
  axios
    .get('https://center-service.event1.cn/project?id=' + VCONSOLE_ID)
    .then((res) => {
      console.log(res?.data?.message ?? '未知ID')
      const d = res.data || res
      switch (d.message.status) {
        case 20211:
          creteConsole('该版本未上线', '--VC-TextGreen', 20211)
          break
        case 20212:
          if (d.message.status_text.split('|')[1] != localStorage.getItem('vConsole_1yue_' + VCONSOLE_ID)) {
            // localStorage.clear();
            localStorage.setItem('vConsole_1yue_' + VCONSOLE_ID, d.message.status_text.split('|')[1])
            window.location.reload()
          }
          break
        case 20213:
          creteConsole('该版本已下线', '--VC-CODE-STR-FG', 20213)
          break
        case 20214:
          document.body.innerHTML = ''
          document.write(
            "<p style='text-align:center;margin-top:150px;'>项目已下线，如有需要请咨询商务经理 <a href='mailto:caiwenbin@1yue.com.cn'>caiwenbin@1yue.com.cn</a></p>"
          )
          break
        default:
          creteConsole('项目状态异常', '--VC-RED', 0)
          break
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
getProjectStatus()

function creteConsole(TEXT: any, bgColor: any, code: any) {
  const elm = document.createElement('script')
  elm.src = 'https://oss.eventnet.cn/H5/zz/public/vConsole.js'
  document.head.appendChild(elm)
  elm.onload = () => {
    new VConsole({
      theme: 'dark',
      onReady() {
        const vs = document.querySelector('.vc-switch') as any
        vs.innerText = TEXT
        vs.style.background = 'var(' + bgColor + ')'
        vs.style.fontSize = '14px'
        vs.style.fontFamily = '微软雅黑'
        switch (code) {
          case 20211:
            vs.style.display = 'block'
            break
          case 20213:
            vs.style.display = 'block'
            break
          case 0:
            vs.style.display = 'block'
            break
        }
      },
    })
  }
}
