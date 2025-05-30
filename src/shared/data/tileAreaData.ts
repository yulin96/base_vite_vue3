import { useCascaderAreaData } from '@vant/area-data'

interface IAreaData {
  text: string
  value: string
}

export const tileAreaData = Array.from(useCascaderAreaData(), (area) => {
  if (area.text === '重庆市' && area.children?.length == 2)
    area.children = [...(area.children[0].children || []), ...(area.children[1].children || [])]
  else area.children = area.children?.length === 1 ? area.children[0].children : area.children

  area.value = area.text
  area.children?.forEach((item) => {
    item.children = undefined
    item.value = item.text
  })

  return area
}) as Array<IAreaData & { children: Array<IAreaData> }>
