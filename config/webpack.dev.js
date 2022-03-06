const baseConfig = require('./webpack.base')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const path = require("path");

module.exports = merge(baseConfig, {
    devtool: 'eval-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]_[hash:8].js',
        chunkFilename: '[name]_[chunkhash:8].js',
        publicPath: '/'
    },
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
        static: {
          directory: path.join(__dirname, "../public")
        },
        port: '8001',
        host: '0.0.0.0',
        hot: true,
        open: false,
        allowedHosts: 'all'
    },
    plugins: [
        new webpack.DefinePlugin({
            __LOCAL: JSON.stringify(true),
            __RELEASE: JSON.stringify(false)
        })
    ]
})
