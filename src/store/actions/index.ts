export const toggleIsLogin = (value: boolean) => {
  return {
    type: 'toggleLoginStatus',
    isLogin: value
  }
}

export const initUser = (data: any) => {
  return {
    type: 'initUser',
    data: data
  }
}
