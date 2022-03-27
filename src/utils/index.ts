import { createFromIconfontCN } from '@ant-design/icons'
import { handle } from "./api"
import axios from "axios"

export const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3249572_95ublen0yxj.js'
})

export const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('img', file)
  const data = await handle(axios.post('/upload', formData), '上传图片', true, true)
  return data.data.url
}

export const judgeNull = (params: Array<any>) => {
  let flag = true
  params.forEach((item: any) => {
    if (item === undefined || item === null || item === '') flag = false
  })
  return flag
}

export const parseTime = (
  time?: any,
  cFormat?: string
): string => {
  if (time === undefined || !time) {
    return ''
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date: Date
  if (typeof time === 'object') {
    date = time as Date
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: { [key: string]: number } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[ key ]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][ value ]
    }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}
