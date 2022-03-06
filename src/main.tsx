import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
require('./style/index.less')
import 'antd/dist/antd.css'

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('app')
);
