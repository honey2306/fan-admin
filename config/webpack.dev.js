const baseConfig = require('./webpack.base')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')

module.exports = merge(baseConfig, {
    devtool: 'eval-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            }
        ]
    },
    devServer: {
        port: '8000',
        host: '0.0.0.0',
        hot: true,
        open: false
    },
    plugins: [
        new webpack.DefinePlugin({
            __LOCAL: JSON.stringify(true),
            __RELEASE: JSON.stringify(false)
        })
    ]
})