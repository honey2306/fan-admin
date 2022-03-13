export const toggleIsLogin = (value: boolean) => {
  return {
    type: 'toggleLoginStatus',
    isLogin: value
  }
}
