import React, {useEffect} from 'react'
import Login from './view/main/Login'
import Home from "./view/main/home"
import {useDispatch, useSelector} from "react-redux"
import {handle} from "./utils/api"
import axios from "axios"
import {toggleIsLogin} from "./store/actions"

function App() {
  const isLogin = useSelector((state: any) => state.isLogin)
  const dispatch = useDispatch()
  useEffect(() => {
    getLoginInfo()
  }, [])

  const getLoginInfo = () => {
    handle(axios.get('/users/loginInfo'), '获取登录信息').then((res: any) => {
      dispatch(toggleIsLogin(true))
    })
  }
  return (
    <>
      {isLogin ? <Home/> : <Login/>}
    </>
  )
}

export default App
