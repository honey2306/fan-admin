import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import {createStore} from "redux"
import {toggleLoginStatus} from "./store/reducer"
import {initStore} from "./store/sotre"
import {Provider} from "react-redux"

require('./style/index.less')

const store = createStore(toggleLoginStatus, initStore)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('app')
)

export const getStore = () => {
  return store
}
