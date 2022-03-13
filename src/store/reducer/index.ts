import {initStore} from "../sotre"

export const toggleLoginStatus = (state: any = initStore, action: any = {}) => {
  if (action.type === 'toggleLoginStatus') {
    return Object.assign({}, state, {
      isLogin: action.isLogin
    })
  } else {
    return state
  }
}
