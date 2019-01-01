const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')


const copyWebpackPlugin = require('copy-webpack-plugin')


let cssExtract = new ExtractTextWebpackPlugin('css/css.css');
let lessExtract = new ExtractTextWebpackPlugin('css/less.css');
let sassExtract = new ExtractTextWebpackPlugin('css/sass.css');


// webpack内部有一个事件流， tapable 1.0
module.exports = {
  // entry: {
  //   index: './src/index.js',
  //   base: './src/base.js',
  //   common: './src/common.js'
  //   // vender: 'jquery'
  // }, // 入口
  entry: './src/main.js',
  output:{
    path: path.join(__dirname,'dist'),
    // filename: '[name].[hash:8].js'
    filename: '[name].js'
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000,
    aggregateTimeout: 500,
  },
  devtool: 'source-map',
  module:{
    rules: [
      {
        test: /\.js$/,
        use:{
          loader: 'babel-loader',
          options: {
            presets: ["env", "stage-0", "react"]
          }
        },
        exclude: /(node_modules|bower_components)/,  // 优化处理加快速度
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     presets: ['@babel/preset-env']
        //   }
        // }
      },
      {
        test: /\.css$/,
        // css-loader用来解析css文件中的url路径
        loader: cssExtract.extract({
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.less$/,
        loader: lessExtract.extract({
          use: ['css-loader','less-loader']
        })
      },
      {
        test: /\.scss$/,
        loader: sassExtract.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|gif|svg|bmp|eot|woff|woff2|ttf)/,
        loader: {
          loader: 'url-loader',
          options: {
            limit: 30*1024,
            outputPath: 'images/'
          }
        }
      },
      {
        test: /\.(html|htm)/,
        loader: 'html-withimg-loader'
      },      
    ]
  },
  plugins:[
    new UglifyjsWebpackPlugin(),
    // 用来自动向模块内部注入变量
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new CleanWebpackPlugin([path.join(__dirname,'dist')]),
    // 此插件可以自动产出html文件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html', // 产出的文件名
      title: 'index',
      // chunks: ['common', 'index'],
      hash: true,
      minify: {
        removeAttributeQuotes: true
      }
    }),
    cssExtract,
    lessExtract,
    sassExtract,
    new copyWebpackPlugin([{
      from: path.join(__dirname, 'public'),
      to: path.join(__dirname, 'dist')
    }])
    // new HtmlWebpackPlugin({
    //   template: './src/index.html',
    //   filename: 'base.html', // 产出的文件名
    //   title: 'base',
    //   chunks: ['common','base'],
    //   hash: true,
    //   minify: {
    //     removeAttributeQuotes: true
    //   }
    // }),
  ],
  // 配置静态文件服务器
  devServer:{
    contentBase: './dist',
    host: 'localhost',
    port: 8000,
    compress: true, // 是否使用gzip压缩
  }
}