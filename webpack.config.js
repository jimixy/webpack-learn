const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// webpack内部有一个事件流， tapable 1.0
module.exports = {
  entry: './src/index.js', // 入口
  output:{
    path: path.join(__dirname,'dist'),
    filename: '[name].[hash:8].js'
  },
  module:{
    rules: [
      {
        test: /\.css$/,
        // css-loader用来解析css文件中的url路径
        loader: ['style-loader','css-loader']
      }
    ]
  },
  plugins:[
    // 此插件可以自动产出html文件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html', // 产出的文件名
      title: '欢迎光临',
      hash: true,
      minify: {
        removeAttributeQuotes: true
      }
    })
  ],
  // 配置静态文件服务器
  devServer:{
    contentBase: './dist',
    host: 'localhost',
    port: 8080,
    compress: true, // 是否使用gzip压缩
  }
}