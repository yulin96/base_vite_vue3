export const userControls = () => {
  //旋转
  const rotate = (card: any, selectedObj: any) => {
    const currAngle = selectedObj.angle // 当前图层的角度
    const angle = currAngle === 360 ? 0 : currAngle + 10
    selectedObj.rotate(angle)
    card.renderAll()
  }
  //删除
  const deleteP = (card: any, selectedObj: any) => {
    card.remove(selectedObj) // 传入需要移除的object
    card.renderAll()
  }
  //向上
  const upon = (selectedObj: any) => {
    selectedObj.bringForward()
  }
  //向下
  const downon = (selectedObj: any) => {
    selectedObj.sendBackwards()
  }
  //转为JSON
  const toJSON = (card: any) => card.toJSON()

  //从JSON加载
  const fromJSON = (card: any, tempJSON: object) => {
    card.loadFromJSON(tempJSON, () => {
      card.renderAll()
    })
  }
  //转为图片
  const toImg = (card: any) => {
    const dataURL = card.toDataURL({
      format: 'jpeg', // jpeg或png
      quality: 0.8, // 图片质量，仅jpeg时可用
      // 截取指定位置和大小
      //left: 100,
      //top: 100,
      //width: 200,
      //height: 200
    })
    return dataURL
  }
  //  ~FIXME
  // const scalexs = () => {
  //   if (!selectedObj) return showToast({ message: '未选中' })
  //   console.log(selectedObj.scaleX)
  //   selectedObj.set({
  //     scaleX: -selectedObj.scaleX,
  //   })
  //   card.renderAll()
  // }

  const clearList = (card: any) => {
    card.clear()
  }

  return { rotate, deleteP, upon, downon, toJSON, fromJSON, toImg, clearList }
}
