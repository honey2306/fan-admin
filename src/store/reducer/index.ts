import { combineReducers } from 'redux'

const isLogin = (state = false, action: any = {}) => {
  if (action.type === 'toggleLoginStatus') {
    return action.isLogin
  } else {
    return state
  }
}

const user = (state: any = {}, action: any = {}) => {
  if (action.type === 'initUser') {
    return {
      ...state,
      ...action.data
    }
  } else {
    return state
  }
}

export default combineReducers({ isLogin, user })
