import React from "react"
import { useSelector } from "react-redux"
import { handle } from "../utils/api"
import axios from "axios"

const User = () => {
  const user = useSelector((state: any) => state.user)
  const logout = () => {
    handle(axios.get('/users/logout'), '退出登录', false, true).then(() => {
      window.location.reload()
    })
  }
  return (
    <div className={'user'}>欢迎你，{user.name} <span className={'logout'} onClick={() => logout()}/></div>
  )
}

export default User
