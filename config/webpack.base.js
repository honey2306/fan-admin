const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const friendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin")
module.exports = {
  entry: path.join(__dirname, '../src/main.tsx'),
  module: {
    rules: [
      // 使用babel进行代码转换
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        },
        exclude: '/node_modules/'
      },
      {
        test: /\.ts$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: '/node_modules/'
      },
      {
        test: /\.tsx$/,
        use: {
          loader: "ts-loader"
        },
        exclude: '/node_modules/'
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'media',
            name: '[name]_[hash:8].[ext]'
          }
        }],
        type: 'javascript/auto'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name]_[hash:8][ext]'
        }
      },
      //字体格式
      {
        test: /\.(ttf|eot|woff|woff2|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'font',
            name: '[name]_[hash:8].[ext]'
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html'
    }),
    new friendlyErrorsWebpackPlugin()
  ]
}
