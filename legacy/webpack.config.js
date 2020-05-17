const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: { // 1.打包入口文件
    // app: './src/index.js',
    // print: './src/print.js'
    app: './src/index.js'
  },
  output: { // 2.打包的输出
    // filename: 'bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/' // for express
  },
  mode: 'production', // 3.环境 | development
  module: {
    rules: [ // 4.Loader 配置
      {
        test: /\.css$/, // 正则匹配文件后缀名
        use: [ // css 文件都交给这两个 loader 处理
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  },
  plugins: [ // 5.插件配置
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: 'favicon.ico', // 指定浏览器标签图标
      template: 'index.html', // 在指定模板的基础上，引入构建后的 js 
      // title: 'Output Management's,
      inject: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'inline-source-map', // 仅推荐开发环境下使用
  devServer: {
    contentBase: './dist',
    hot: true
  }
};