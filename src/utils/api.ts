import axios from "axios"
import {message} from 'antd'
import {getStore} from "../main"
import {toggleIsLogin} from "../store/actions"

axios.defaults.timeout = 600000
axios.defaults.baseURL = 'http://api-test.netease.com:3000'
axios.defaults.withCredentials = true

const successCode = 0
const needAuthCode = -1

axios.interceptors.response.use((response: any) => {
  const jsonRes = response.data
  const {code, msg, data} = jsonRes
  if (code === needAuthCode) {
    getStore().dispatch(toggleIsLogin(false))
  } else if (code === successCode) {
    return {
      code,
      msg,
      data
    }
  }
  const errMsg = `[${response.config.url}][${jsonRes.code}] ` + (msg || 'Error')
  return Promise.reject(new Error(errMsg))
})

export const handle = (defer: Promise<any>, desc: string, showSucc?: boolean) => {
  defer.catch((ex: any) => {
    message.error(`${desc}失败：${ex.message.replace(/\[.+?]/g, '')}`)
  })

  return defer.then(r => {
    showSucc && message.success(`${desc}成功`)
    return r
  })
}
