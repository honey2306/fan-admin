import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import initStore from "./store/initStore"
import { Provider } from "react-redux"

require('./style/index.less')

const store: any = initStore()

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.Fragment>,
  document.getElementById('app')
)
