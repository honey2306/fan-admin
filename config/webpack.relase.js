const baseConfig = require('./webpack.base')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(baseConfig, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
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
            filename: 'css/[name]_[contenthash_8].css',
            publicPath: 'css'
        })
    ]
})