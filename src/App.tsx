import React, { useEffect } from 'react'
import Login from './view/main/Login'
import Home from "./view/main/home"
import { useDispatch } from "react-redux"
import { handle } from "./utils/api"
import axios from "axios"
import { initUser, toggleIsLogin } from "./store/actions"

function App() {
  const isLogin = true
  const dispatch = useDispatch()
  useEffect(() => {
    getLoginInfo()
  }, [])

  const getLoginInfo = () => {
    handle(axios.get('/users/loginInfo'), '获取登录信息', false, false).then((res: any) => {
      dispatch(toggleIsLogin(true))
      dispatch(initUser(res.data))
    })
  }
  return (
    <>
      {isLogin ? <Home/> : <Login/>}
    </>
  )
}

export default App
