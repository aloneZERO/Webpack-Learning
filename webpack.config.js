const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: require.resolve('./src/index.js'),
        use: 'imports-loader?this=>window'
      },
      {
        test: require.resolve('./src/globals.js'),
        use: 'exports-loader?file,parse=helpers.parse'
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Leo Webpack'
    }),
    new webpack.ProvidePlugin({
      _: 'lodash', // 当 webpack 发现'_'被引用时，自动引入 lodash
      join: ['lodash', 'join'] // 只暴露 lodash 的 join 方法
    })
  ]
};