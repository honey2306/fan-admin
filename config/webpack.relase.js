const baseConfig = require('./webpack.base')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require("_clean-webpack-plugin@4.0.0@clean-webpack-plugin");
const path = require("path");

module.exports = merge(baseConfig, {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'main.js',
        publicPath: './',
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                },
                    {
                        loader: 'css-loader'
                    },
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __LOCAL: JSON.stringify(false),
            __RELEASE: JSON.stringify(true)
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[contenthash:8].css'
        }),
        new CleanWebpackPlugin()
    ]
})
